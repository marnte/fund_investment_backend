import { Request, Response } from 'express'
import * as investmentService from '../services/investment.service'


//Creates an investment after checking that all required fields are filled
//Checks that amount and date are valid
export const createInvestment = async (req: Request, res: Response) => {
  try {
   
    const { fund_id } = req.params;
    const { investor_id, amount_usd, investment_date } = req.body || {};

    if (!fund_id || !investor_id || amount_usd == null || !investment_date) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    if (amount_usd <= 0) {
      return res.status(400).json({ 
        error: 'Amount must be greater than 0' 
      })
    }

    const date = new Date(investment_date)
    if (isNaN(date.getTime())) {
      return res.status(400).json({ 
          error: 'Invalid investment date' 
        })
    }

    const fundId = fund_id as string
    const investorId = investor_id as string

    const investment = await investmentService.create({
      fund_id: fundId,
      investor_id: investorId,
      amount_usd,
      investment_date
    })

    return res.status(201).json(investment)
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}




//Returns all investments from a fund
export const getInvestmentsByFund = async (req: Request, res: Response) => {
  try {

    const {fund_id} = req.params

    const fundId = fund_id as string

    if (!fundId){
      return res.status(400).json({ error: 'No fund id specified' })
    }
    const investments = await investmentService.getByFundId(fundId)

    return res.status(200).json(investments)
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}
