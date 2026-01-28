export const validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return {
      code: "MISSING_FIELDS",
      message: "All fields are required",
    }
  }
}

export const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return {
      code: "MISSING_FIELDS",
      message: "All fields are required",
    }
  }
}
