import express from 'express'
import authenticateToken from '../middlewares/user.middleware.js'
import { create, getAllDeals, getOneDeal } from '../controllers/deal.controller.js'

const router = express.Router()

router.post('/create', authenticateToken, create)
router.get('/all', getAllDeals)
router.get('/one/:id', getOneDeal)


router.get('/check', (req, res) => {
  res.send('Deal route is running')
})

export default router
