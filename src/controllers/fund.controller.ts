import { Request, Response } from 'express'
import * as fundService from '../services/fund.service'


// Calls the server to create the fund with the given parameters in request
// First validate that all required fields are not none
export const createFund = async (req: Request, res: Response) => {
  try {
    const { name, vintage_year, target_size_usd, status } = req.body || {};

    if (!name || !vintage_year || !target_size_usd || !status) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    if (vintage_year <= 2000) {
      return res.status(400).json({ 
        message: 'Vintage year must be after 2000' 
      })
    }

    if (target_size_usd < 0) {
      return res.status(400).json({ 
        message: 'Target size must be greater than 0' 
      })
    }

    const fund = await fundService.create({
      name,
      vintage_year,
      target_size_usd,
      status
    });

    return res.status(201).json(fund);
  } catch (error:any) {
    console.log("Failed to create fund:", error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
};


// Gets all the existing funds from the database
export const getFunds = async (req: Request, res: Response) => {
  try {
    const funds = await fundService.getAll()

    return res.status(200).json(funds)
    
  } catch (error:any) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}


// Returns a fund's full details by fund id
export const getFundById = async (req: Request, res: Response) => {
  try {

    const {id} = req.params 
    const fundId = id as string

    if (!fundId){
      return res.status(400).json({ error: 'No id specified' })
    }

    const fund = await fundService.getById(fundId)

    if (!fund) {
        return res.status(404).json({ error: 'Fund not found' })
    }

    return res.status(200).json(fund)

  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }
}


// Checks a fund by its id and updates the columns passed as arguments
export const updateFund = async (req: Request, res: Response) => {
  try {
    const ALLOWED_FIELDS = ["name", "vintage_year", "target_size_usd", "status"];
    const { id, ...data } = req.body || {};

    if (!id) {
      return res.status(400).json({ error: "No id specified" });
    }

    const filteredData = Object.keys(data)
      .filter((key) => ALLOWED_FIELDS.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = data[key];
        return obj;
      }, {});


    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const fund = await fundService.update(id, filteredData);

    return res.status(200).json({
      data: fund,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Internal server error",
    });
  }
};