const userModel = require("../models/user.model");
const ErrorResponse = require("../helpers/ErrorResponse");

module.exports = {
  list: async (req, res) => {
    try {
      let user = await userModel
        .find({})
        .populate("major")
        .select(["-updatedAt", "-createdAt"])
        .sort({ createdAt: -1 });
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },
  listTeacherReview: async (req, res) => {
    try {
      const data = await userModel
        .find({ major: req.params.id, role: 1 })
        .populate("major");
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getListTeacher: async (req, res) => {
    try {
      let user = await userModel
        .find({ role: { $in: [1, 2] } })
        .populate("major");
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },
  findUser: async (req, res) => {
    try {
      let user = await userModel
        .findById(req.params.id)
        .select(["-updatedAt", "-createdAt"]);
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  },
  login: async (req, res) => {
    try {
      let { ...body } = req.body;
      let user = await userModel
        .findOne({
          phone: body.phone,
          password: body.password,
        })
        .select("-password");

      if (!user) {
        throw new ErrorResponse(
          404,
          "Số điện thoại hoặc mật khẩu không chính xác"
        );
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  loginGoogle: async (req, res) => {
    try {
      let { ...body } = req.body;
      let user = await userModel
        .findOne({
          email: body.email,
        })
        .populate("major")
        .select("-password");

      if (!user) {
        throw new ErrorResponse(404, "Email chưa được đăng kí");
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  create: async (req, res) => {
    try {
      let { ...body } = req.body;

      let user = await userModel.findOne({
        phone: body.phone,
      });

      if (user) {
        throw new ErrorResponse(404, "Số điện thoại đã tồn tại");
      }

      const data = await userModel.create(body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      const user = await userModel.findById(req.params.id);
      res.status(201).json(user);
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (req, res) => {
    try {
      await userModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa user thành công");
    } catch (error) {
      throw error;
    }
  },
};