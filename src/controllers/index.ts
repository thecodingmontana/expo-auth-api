import { Response, Request } from "express";
import * as bcrypt from "bcrypt";

const hashPassword = async (req: Request, resp: Response) => {
  try {
    const { password } = req.body;

    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 255
    ) {
      return resp.status(400).json({
        message: "Invalid Password Length",
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    return resp.status(200).json({
      hashedPassword,
    });
  } catch (error: any) {
    return resp.status(500).json({
      message: error.message,
    });
  }
};

const comparePassword = async (req: Request, resp: Response) => {
  try {
    const { password, hashedPassword } = req.body;

    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 255
    ) {
      return resp.status(400).json({
        message: "Invalid Password Length",
      });
    }

    if (!hashedPassword) {
      return resp.status(400).json({
        message: "Hashed password is required!",
      });
    }

    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      return resp.status(400).json({
        message: "Incorrect password!",
      });
    }

    return resp.status(200).json({
      message: "Password is correct!",
    });
  } catch (error: any) {
    return resp.status(500).json({
      message: error.message,
    });
  }
};

export default {
  hashPassword,
  comparePassword,
};
