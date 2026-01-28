import jwt from "jsonwebtoken"
import ENV from '../lib/env.js'

export const signToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: "1h",
  })
}
