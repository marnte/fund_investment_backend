import { Router } from 'express'
import { createInvestor, getInvestors } from '../controllers/investor.controller'

const router = Router()

router.post('/', createInvestor)
router.get('/', getInvestors)

export default router