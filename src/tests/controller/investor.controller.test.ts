import { createInvestor, getInvestors } from '../../controllers/investor.controller'
import * as investorService from '../../services/investor.service'

describe('Investor Controller', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = {
      body: {},
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    jest.clearAllMocks()
  })

  // -----------------------------
  // CREATE INVESTOR
  // -----------------------------
  describe('createInvestor', () => {
    it('should return 400 if required fields are missing', async () => {
      req.body = {}

      await createInvestor(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Missing required fields',
      })
    })

    it('should return 400 if investor_type is invalid', async () => {
      req.body = {
        name: 'John Doe',
        investor_type: 'InvalidType',
        email: 'john@test.com',
      }

      await createInvestor(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Incorrect Investor Type',
      })
    })

    it('should return 400 if email is invalid', async () => {
      req.body = {
        name: 'John Doe',
        investor_type: 'Individual',
        email: 'invalid-email',
      }

      await createInvestor(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Incorrect Email Address',
      })
    })

    it('should create investor successfully', async () => {
      req.body = {
        name: 'John Doe',
        investor_type: 'Individual',
        email: 'john@test.com',
      }

      const mockInvestor = {
        id: '1',
        ...req.body,
      }

      jest.spyOn(investorService, 'create').mockResolvedValue(mockInvestor as any)

      await createInvestor(req, res)

      expect(investorService.create).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(mockInvestor)
    })

    it('should return 500 if service throws error', async () => {
      req.body = {
        name: 'John Doe',
        investor_type: 'Individual',
        email: 'john@test.com',
      }

      jest
        .spyOn(investorService, 'create')
        .mockRejectedValue(new Error('DB error'))

      await createInvestor(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'DB error',
      })
    })
  })

  // -----------------------------
  // GET INVESTORS
  // -----------------------------
  describe('getInvestors', () => {
    it('should return all investors', async () => {
      const mockData = [
        { id: '1', name: 'John', investor_type: 'Individual', email: 'john@test.com' },
      ]

      jest.spyOn(investorService, 'getAll').mockResolvedValue(mockData as any)

      await getInvestors(req, res)

      expect(investorService.getAll).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(mockData)
    })

    it('should return 500 if service fails', async () => {
      jest
        .spyOn(investorService, 'getAll')
        .mockRejectedValue(new Error('DB failure'))

      await getInvestors(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'DB failure',
      })
    })
  })
})