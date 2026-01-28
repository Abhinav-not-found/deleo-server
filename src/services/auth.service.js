import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const createUser = async (data) => {
  return await User.create(data)
}

export const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}
export const findUserById = async (id) => {
  return await User.findById(id).select("-password")
}

export const validatePassword = async (input, hashed) => {
  return await bcrypt.compare(input, hashed)
}
