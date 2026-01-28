import ENV from "../lib/env.js"
import { validateLogin, validateRegister } from '../validators/auth.validators.js'
import { signToken } from "../utils/token.js"
import { createUser, findUserByEmail, findUserById, validatePassword } from "../services/auth.service.js"

export const register = async (req, res, next) => {
  try {
    const error = validateRegister(req.body)
    if (error) return res.status(400).json(error)

    const { name, email, password } = req.body

    const exist = await findUserByEmail(email)
    if (exist) {
      return res.status(400).json({
        code: "EMAIL_EXISTS",
        message: "Email already registered",
      })
    }

    await createUser({ name, email, password })
    res.status(201).json({ message: "User Registered" })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const error = validateLogin(req.body)
    if (error) return res.status(400).json(error)

    const { email, password } = req.body

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(400).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      })
    }

    const match = await validatePassword(password, user.password)
    if (!match) {
      return res.status(400).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      })
    }

    const token = signToken({ id: user._id })

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "lax",
    })
    res.status(200).json({ message: "Logged out" })
  } catch (error) {
    next(error)
  }
}
