const { Product, Category, CategoryProduct } = require("../../models");
const Joi = require("joi");
const URL = process.env.URL;
const uploadUrl = URL + "/uploads/";

exports.getProducts = async (req, res) => {
  try {
    const productsFromDatabase = await Product.findAll({
      include: {
        model: Category,
        as: "categories",
        through: {
          model: CategoryProduct,
          as: "jembatan",
          attributes: [],
        },
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "jembatan"],
      },
    });

    const productString = JSON.stringify(productsFromDatabase);
    const productObject = JSON.parse(productString);

    const products = productObject.map((product) => ({
      ...product,
      image: uploadUrl + product.image,
    }));

    res.send({
      status: "success",
      message: "Products Succesfully Get",
      data: {
        products,
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

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        as: "products",
        through: {
          model: CategoryProduct,
          as: "jembatan",
          attributes: [],
        },
      },
    });

    res.send({
      status: "success",
      message: "Products Succesfully Get",
      data: {
        categories,
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

exports.addProduct = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(5).max(30).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });

    const productFromDatabase = await Product.create({
      name: req.body.name,
      image: req.files.image[0].filename,
    });

    const productString = JSON.stringify(productFromDatabase);
    const productObject = JSON.parse(productString);

    const product = {
      ...productObject,
      image: uploadUrl + productObject.image,
    };

    res.send({
      status: "success",
      message: "Product Succesfully Created",
      data: {
        product,
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
