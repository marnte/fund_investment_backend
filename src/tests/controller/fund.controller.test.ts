import { createFund, getFunds, getFundById, updateFund } from "../../controllers/fund.controller"
import * as fundService from "../../services/fund.service"

describe("Fund Controller", () => {

  const mockResponse = () => {
    const res: any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  // ======================
  // CREATE FUND
  // ======================

  describe("createFund", () => {

    it("should create a fund", async () => {
      const req: any = {
        body: {
          name: "Test Fund",
          vintage_year: 2025,
          target_size_usd: 1000000,
          status: "Fundraising",
        },
      }

      const res = mockResponse()

      jest.spyOn(fundService, "create").mockResolvedValue({ id: 1 } as any)

      await createFund(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ id: 1 })
    })

    it("should return 400 if missing fields", async () => {
      const req: any = { body: {} }
      const res = mockResponse()

      await createFund(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it("should return 400 if vintage year invalid", async () => {
      const req: any = {
        body: {
          name: "Test",
          vintage_year: 1999,
          target_size_usd: 1000,
          status: "Fundraising",
        },
      }

      const res = mockResponse()

      await createFund(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it("should return 400 if target size invalid", async () => {
      const req: any = {
        body: {
          name: "Test",
          vintage_year: 2025,
          target_size_usd: -1,
          status: "Fundraising",
        },
      }

      const res = mockResponse()

      await createFund(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it("should handle service error", async () => {
      const req: any = {
        body: {
          name: "Test",
          vintage_year: 2025,
          target_size_usd: 1000,
          status: "Fundraising",
        },
      }

      const res = mockResponse()

      jest.spyOn(fundService, "create").mockRejectedValue({
        message: "DB error",
        statusCode: 500,
      })

      await createFund(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  // ======================
  // GET ALL FUNDS
  // ======================

  describe("getFunds", () => {

    it("should return all funds", async () => {
      const req: any = {}
      const res = mockResponse()

      jest.spyOn(fundService, "getAll").mockResolvedValue([{ id: 1 }] as any)

      await getFunds(req, res)

      expect(res.json).toHaveBeenCalledWith([{ id: 1 }])
    })

    it("should handle error", async () => {
      const req: any = {}
      const res = mockResponse()

      jest.spyOn(fundService, "getAll").mockRejectedValue({
        message: "DB error",
        statusCode: 500,
      })

      await getFunds(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  // ======================
  // GET FUND BY ID
  // ======================

  describe("getFundById", () => {

    it("should return fund", async () => {
      const req: any = { params: { id: "1" } }
      const res = mockResponse()

      jest.spyOn(fundService, "getById").mockResolvedValue({ id: 1 } as any)

      await getFundById(req, res)

      expect(res.json).toHaveBeenCalledWith({ id: 1 })
    })

    it("should return 400 if no id", async () => {
      const req: any = { params: {} }
      const res = mockResponse()

      await getFundById(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it("should return 404 if fund not found", async () => {
      const req: any = { params: { id: "1" } }
      const res = mockResponse()

      jest.spyOn(fundService, "getById").mockResolvedValue(null)

      await getFundById(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  // ======================
  // UPDATE FUND
  // ======================

  describe("updateFund", () => {

    it("should update fund", async () => {
      const req: any = {
        params: { id: "1" },
        body: { data: { name: "Updated" } },
      }

      const res = mockResponse()

      jest.spyOn(fundService, "update").mockResolvedValue({ id: 1 } as any)

      await updateFund(req, res)

      expect(res.json).toHaveBeenCalledWith({ id: 1 })
    })

    it("should return 400 if no id", async () => {
      const req: any = { params: {}, body: {} }
      const res = mockResponse()

      await updateFund(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it("should return 404 if fund not found", async () => {
      const req: any = {
        params: { id: "1" },
        body: { data: {} },
      }

      const res = mockResponse()

      jest.spyOn(fundService, "update").mockRejectedValue(new Error("Not found"))

      await updateFund(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

})