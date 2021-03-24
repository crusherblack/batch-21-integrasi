const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(10).max(50).required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      role: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail)
      return res.status(400).send({
        status: "Register failed",
        message: "Email already registered",
      });

    const hashStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrength);

    const user = await User.create({
      ...req.body,
      image: req.files.imageFile[0].filename,
      video: req.files.videoFile[0].filename,
      password: hashedPassword,
    });

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    const url = "http://localhost:5000/uploads/";

    res.send({
      status: "success",
      message: "User Succesfully Registered",
      data: {
        user: {
          name: user.name,
          email: user.email,
          token,
          role: user.role,
          image: url + user.image,
          video: url + user.video,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(10).max(50).required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail)
      return res.status(400).send({
        status: "Login Failed",
        message: "Your Credentials is not Valid",
      });

    const isValidPass = await bcrypt.compare(password, checkEmail.password);

    if (!isValidPass) {
      return res.status(400).send({
        status: "Login Failed",
        message: "Your Credentials is not Valid",
      });
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      message: "Login Success",
      data: {
        user: {
          name: checkEmail.name,
          email: checkEmail.email,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
    });

    res.send({
      status: "success",
      message: "User Valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};
