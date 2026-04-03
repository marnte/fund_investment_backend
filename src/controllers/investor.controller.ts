import { Request, Response } from 'express'
import * as investorService from '../services/investor.service'


//Creates an investor with all the required fields, investor, investor_type and email
//All the fields are required
//Checks that investor type is one of the valid types
//Checks that email structure is correct
export const createInvestor = async (req: Request, res: Response) => {
  try {
    const { name, investor_type, email } = req.body || {}

    if(!name || !investor_type || !email){
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const validTypes = ['Individual', 'Institution', 'Family Office']
    if (!validTypes.includes(investor_type)) {
      return res.status(400).json({
        message: "Incorrect Investor Type"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Incorrect Email Address"
      });
    }

    const investor = await investorService.create({
      name,
      investor_type,
      email
    })

    return res.status(201).json(investor)
  } catch (error: any) {
    console.log("Could not create investor")
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}


// Returns all the investors from the last investor added to the earliest
export const getInvestors = async (req: Request, res: Response) => {
  try {
    const investors = await investorService.getAll()
    return res.status(200).json(investors)
  } catch (error: any) {
    console.log("Could not return investors")
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}