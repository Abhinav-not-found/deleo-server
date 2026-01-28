import Deal from '../models/deal.model.js'

export const createDeal = async (data) => {
  // const exists = await Deal.findOne({ title: data.title })
  // if (exists) {
  //   const err = new Error("Deal already exists")
  //   err.status = 409
  //   throw err
  // }
  return await Deal.create(data)
}

export const findAllDeals = async()=>{
  return await Deal.find({}).lean()
}

export const findDealById = async(id)=>{
  return await Deal.findById(id).lean()
}
