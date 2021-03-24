const { User } = require("../../models");

exports.checkRolePartner = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
    });

    if (user.role === "PARTNER") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Gak bisa akses ini, karena lu bukan partner",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Role lu gak boleh masuk sini",
    });
  }
};

exports.checkRoleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId.id,
      },
    });

    if (user.role === "USER") {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Gak bisa akses ini, karena lu bukan user",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Role lu gak boleh masuk sini",
    });
  }
};
