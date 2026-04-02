import { Router } from 'express'
import { createFund, getFundById, getFunds, updateFund } from '../controllers/fund.controller'

const router = Router()

router.post('/', createFund)
router.get('/', getFunds)
router.get('/:id', getFundById)
router.put('/', updateFund)

export default router