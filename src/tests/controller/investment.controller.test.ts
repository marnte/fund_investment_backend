import {
  createInvestment,
  getInvestmentsByFund,
} from '../../controllers/investment.controller'

import * as investmentService from '../../services/investment.service'

describe('Investment Controller', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    jest.clearAllMocks()
  })

  // -----------------------------
  // CREATE INVESTMENT
  // -----------------------------
  describe('createInvestment', () => {
    it('should return 400 if required fields are missing', async () => {
      req.params = { fund_id: '' }
      req.body = {}

      await createInvestment(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Missing required fields',
      })
    })

    it('should return 400 if amount is <= 0', async () => {
      req.params = { fund_id: 'fund1' }
      req.body = {
        investor_id: 'inv1',
        amount_usd: 0,
        investment_date: '2024-01-01',
      }

      await createInvestment(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Amount must be greater than 0',
      })
    })

    it('should return 400 if investment date is invalid', async () => {
      req.params = { fund_id: 'fund1' }
      req.body = {
        investor_id: 'inv1',
        amount_usd: 100,
        investment_date: 'invalid-date',
      }

      await createInvestment(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid investment date',
      })
    })

    it('should create investment successfully', async () => {
      req.params = { fund_id: 'fund1' }
      req.body = {
        investor_id: 'inv1',
        amount_usd: 1000,
        investment_date: '2024-01-01',
      }

      const mockInvestment = {
        id: '1',
        ...req.body,
        fund_id: 'fund1',
      }

      jest
        .spyOn(investmentService, 'create')
        .mockResolvedValue(mockInvestment as any)

      await createInvestment(req, res)

      expect(investmentService.create).toHaveBeenCalledWith({
        fund_id: 'fund1',
        investor_id: 'inv1',
        amount_usd: 1000,
        investment_date: '2024-01-01',
      })

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(mockInvestment)
    })

    it('should return 500 if service throws error', async () => {
      req.params = { fund_id: 'fund1' }
      req.body = {
        investor_id: 'inv1',
        amount_usd: 1000,
        investment_date: '2024-01-01',
      }

      jest
        .spyOn(investmentService, 'create')
        .mockRejectedValue(new Error('DB error'))

      await createInvestment(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'DB error',
      })
    })
  })

  // -----------------------------
  // GET INVESTMENTS BY FUND
  // -----------------------------
  describe('getInvestmentsByFund', () => {
    it('should return 400 if fund_id is missing', async () => {
      req.params = {}

      await getInvestmentsByFund(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'No fund id specified',
      })
    })

    it('should return investments for a fund', async () => {
      req.params = { fund_id: 'fund1' }

      const mockData = [
        {
          id: '1',
          fund_id: 'fund1',
          investor_id: 'inv1',
          amount_usd: 1000,
          investment_date: '2024-01-01',
        },
      ]

      jest
        .spyOn(investmentService, 'getByFundId')
        .mockResolvedValue(mockData as any)

      await getInvestmentsByFund(req, res)

      expect(investmentService.getByFundId).toHaveBeenCalledWith('fund1')
      expect(res.json).toHaveBeenCalledWith(mockData)
    })

    it('should return 500 if service fails', async () => {
      req.params = { fund_id: 'fund1' }

      jest
        .spyOn(investmentService, 'getByFundId')
        .mockRejectedValue(new Error('DB failure'))

      await getInvestmentsByFund(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'DB failure',
      })
    })
  })
})