import { Router } from 'express'
import { createInvestment, getInvestmentsByFund } from "../controllers/investment.controller"

const router = Router()

router.post('/funds/:fund_id/investments', createInvestment)
router.get('/funds/:fund_id/investments', getInvestmentsByFund);

export default router