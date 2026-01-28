import { createDeal, findAllDeals, findDealById } from "../services/deal.service"
import { validateCreate } from "../validators/deal.validators"

export const create = async (req, res, next) => {
  try {
    const error = validateCreate(req.body)
    if (error) return res.status(400).json(error)

    const deal = await createDeal(req.body)

    res.status(201).json({ message: "Deal Created", data: deal })
  } catch (error) {
    next(error)
  }
}

export const getAllDeals = async (req, res, next) => {
  try {
    const deals = await findAllDeals()
    res.status(200).json({ message: "Fetched", data: deals })
  } catch (error) {
    next(error)
  }
}

export const getOneDeal = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await findDealById(id)
    if (!data) {
      return res.status(404).json({ message: "Deal not found" })
    }
    res.status(200).json({ message: "Fetched", data: data })
  } catch (error) {
    next(error)
  }
}
