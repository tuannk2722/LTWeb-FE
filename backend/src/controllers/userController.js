import companyModel from "../models/companyModel.js";
import userModel from "../models/userModel.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Tạo company rỗng
    const company = await companyModel.create({});

    // Tạo user
    const user = await userModel.create({
      email,
      password,
      companyId: company._id,
    });

    res.status(201).json({
      message: "Recruiter registered successfully",
      userId: user._id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        message: "Sai email hoặc mật khẩu!"
      });
    }

    // SET COOKIE
    res.cookie("isLogin", user._id, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Đăng nhập thành công!",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};