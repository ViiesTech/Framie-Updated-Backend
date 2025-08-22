const userFunction = require("../functions/user");
const validation = require("../functions/validate.js");
const sendEmail = require("../functions/sendOTP");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const validate = await validation.validateEmail(req);
    if (validate) {
      return res.status(403).json({
        success: false,
        msg: "Email already Taken!",
      });
    } else {
      const user = await userFunction.signup(req);
      let userId = user._id;
      console.log("object:", userId);
      const otp = await userFunction.generateOTP(userId);
      const userData = {
        id: user._id,
        email: user.email,
        phNumber: user.phNumber,
        OTP: otp.OTP,
      };
      const send = await sendEmail.sendOTP(userData);
      return res.status(200).json({
        success: true,
        msg: "OTP is Sent Successfully!",
        data: userData,
      });
    }
  } catch (error) {
    console.log("having errors: ", error);
    return res.status(403).json({
      success: false,
      msg: "Having Errors",
      error,
    });
  }
};

const signInByGoogle = async (req, res) => {
  try {
    const validate = await validation.validateEmail(req);
    console.log("first :", validate);
    if (validate) {
      const password = "123456789";
      const hashPassword = await bcrypt.hash(password, 10);
      const verify = await validation.verifyPassword(password, hashPassword);
      if (verify) {
        const user = await userFunction.getUser(req);
        const token = jwt.sign(
          {
            id: user._id,
            eamil: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1y" }
        );
        return res.status(200).json({
          success: true,
          msg: "User Logged In!",
          data: user,
          accessToken: token
        });
      } else {
        console.log("Having Errors :", err);
        return res.status(200).json({
          success: false,
          msg: "Having Errors",
          error: err.message,
        });
      }
    } else {
      const user = await userFunction.signupByGoogle(req);
      if (user) {
        const token = jwt.sign(
          {
            id: user._id,
            eamil: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          },
          process.env.SECRET_KEY,
          { expiresIn: "1y" }
        );
        return res.status(200).json({
          sucess: true,
          msg: "User signedIn By Google Successfully!",
          data: user,
          accessToken: token,
        });
      } else {
        console.log("Having Errors :", err);
        return res.status(200).json({
          success: false,
          msg: "Having Errors",
          error: err.message,
        });
      }
    }
  } catch (error) {
    console.log("Having Errors :", error);
    return res.status(200).json({
      success: false,
      msg: "Having Errors",
      error: error.message,
    });
  }
};

const generateOTP = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await userFunction.getUserForOTP(userId);
    const otp = await userFunction.generateOTP(userId);
    const userData = {
      email: user.email,
      phNumber: user.phNumber,
      OTP: otp.OTP,
    };
    const send = await sendEmail.sendOTP(userData);

    return res.status(200).json({
      success: true,
      msg: "OTP!",
      data: otp,
    });
  } catch (error) {
    console.log("having errors: ", error);
    return res.status(403).json({
      success: false,
      msg: "Having Errors",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const validate = await validation.validateEmail(req);
    if (!validate) {
      return res.status(403).json({
        success: false,
        msg: "Inavlid Email",
      });
    } else {
      const user = await userFunction.getUser(req);
      let password = req.body.password;
      let hash = user.password;
      const verify = await validation.verifyPassword(password, hash);
      if (!verify) {
        return res.status(403).json({
          sucess: false,
          msg: "Incorrect Password",
        });
      } else {
        let userId = user._id;
        // console.log("object:", userId);
        const otp = await userFunction.generateOTP(userId);
        const userData = {
          id: user._id,
          email: user.email,
          OTP: otp.OTP,
          phNumber: user.phNumber,
        };
        const send = await sendEmail.sendOTP(userData);
        return res.status(200).json({
          success: true,
          msg: "OTP Sent Successfully!",
          data: userData,
        });
      }
    }
  } catch (error) {
    console.log("having errors: ", error);
    return res.status(403).json({
      success: false,
      msg: "Having Errors",
      error,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const user = await userFunction.getUser(req);
    const userId = user._id;
    const OTP = req.body.OTP;
    console.log("userId :", userId);
    console.log("object :", OTP);
    const verifyOTP = await userFunction.verifyOTP(userId, OTP);
    if (!verifyOTP) {
      return res.status(403).json({
        sucess: false,
        msg: "Invalid Code or Not Found",
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phNumber: user.phNumber,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2 days" }
      );
      if (user.isVerified === true) {
          req.body.userId = user._id ;
        const userData = await userFunction.getProfile(req);
        return res.status(200).json({
          success: true,
          msg: "User is Successfully Verified!",
          data: userData,
          accessToken: token,
        });
      } else {
        const updateUser = await userFunction.verifyUser(userId);
        return res.status(200).json({
          success: true,
          msg: "User is Successfully Verified",
          data: updateUser,
          accessToken: token,
        });
      }
    }
  } catch (error) {
    console.log("having errors: ", error);
    return res.status(403).json({
      success: false,
      msg: "Having Errors",
      error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userFunction.getProfile(req);
    return res.status(200).json({
      success: true,
      msg: "User Profile!",
      data: user,
    });
  } catch (error) {
    console.log("having errors: ", error);
    return res.status(403).json({
      success: false,
      msg: "Having Errors",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userFunction.updateUser(req);
    return res.status(200).json({
      success: true,
      msg: "User's Profile is updated!",
      data: updatedUser,
    });
  } catch (error) {
    console.log("having errors: ", error);
    return res.status(403).json({
      success: false,
      msg: "Having Errors",
      error,
    });
  }
};

module.exports = {
  signUp,
  signInByGoogle,
  generateOTP,
  login,
  verifyOTP,
  getProfile,
  updateUser,
};
