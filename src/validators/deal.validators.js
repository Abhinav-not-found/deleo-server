const ALLOWED_CATEGORIES = [
  "cloud",
  "design",
  "marketing",
  "productivity",
  "analytics",
]

export const validateCreate = (data) => {
  const { title, description, discount, category } = data

  if (!title?.trim() || !description?.trim()) {
    return {
      code: "MISSING_FIELDS",
      message: "Title, description, and discount are required",
    }
  }

  if (!category || !ALLOWED_CATEGORIES.includes(category)) {
    return {
      code: "INVALID_CATEGORY",
      message: "Invalid deal category",
    }
  }

  if (typeof discount !== "number" || discount <= 0) {
    return {
      code: "INVALID_DISCOUNT",
      message: "Discount must be a positive number",
    }
  }

  return null
}
