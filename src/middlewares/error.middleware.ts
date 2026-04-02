import { Request, Response, NextFunction } from 'express'

// for more modular error handling we could use this
// it is not used for the purposes of this work

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Failed to get funds:", error)
    return res.status(error.statusCode || 500).json({ error: error.message })
}