const { User, Profile, Skill } = require("../../models/");
const Joi = require("joi");

exports.getUsers = async (req, res) => {
  try {
    const usersFromDatabase = await User.findAll({
      include: [
        {
          model: Profile,
          attributes: {
            exclude: ["createdAt", "updatedAt", "UserId", "userId"],
          },
        },
        {
          model: Skill,
          as: "skills",
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const usersString = JSON.stringify(usersFromDatabase);
    const userObject = JSON.parse(usersString);

    const users = userObject.map((user, index) => {
      const userAvatar = `${user.name} ${index}.png`;
      const url = "http://localhost:5000/api/v1/";

      const newProfile = user.Profile;
      delete user.Profile;
      return {
        ...user,
        avatar: url + userAvatar,
        profile: newProfile,
      };
    });

    res.send({
      status: "success",
      message: "Users Succesfully Get",
      data: {
        users,
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

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
    });

    res.send({
      status: "success",
      message: "Profiles Succesfully Get",
      data: {
        profiles,
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

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      include: {
        model: User,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "Skills Succesfully Get",
      data: {
        skills,
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

exports.getDetailUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "User Succesfully Get",
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

exports.addUser = async (req, res) => {
  try {
    const { body } = req;

    const { email, password, name, phone } = body;

    const schema = Joi.object({
      email: Joi.string().email().min(10).max(30).required(),
      password: Joi.string().min(6).max(50).required(),
      name: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(10).max(13).required(),
    });

    const { error } = schema.validate({ email, password, name, phone });

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const input = {
      email,
      password,
      name: "CANDIDATE" + name,
      phone,
    };

    const user = await User.create(input);

    res.send({
      status: "success",
      message: "User Succesfully Added",
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const checkId = await User.findOne({
      where: {
        id,
      },
    });

    if (!checkId)
      return res.send({
        status: "success",
        message: `User with id: ${id} not found`,
        data: {
          user,
        },
      });

    const updatedUserId = await User.update(body, {
      where: {
        id,
      },
    });

    const user = await User.findOne({
      where: {
        id: updatedUserId,
      },
    });

    res.send({
      status: "success",
      message: "User Succesfully Updated",
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "User Succesfully Delete",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.functionName = async (req, res) => {
  try {
    res.send({
      status: "success",
      message: "User Succesfully Get",
      data: {
        data,
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
