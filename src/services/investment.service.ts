import { prisma } from "../prisma/prisma"


// Creates an investment if the fund and investor exists
// Returns the new investment made 
// Or an error that is thrown due to missing fund or investor
export const create = async (data: {
  fund_id: string
  investor_id: string
  amount_usd: number
  investment_date: string
}) => {

  const fund = await prisma.fund.findUnique({
    where: { id: data.fund_id }
  })

  if (!fund) {
    throw Object.assign(new Error('Fund not found'), { statusCode: 404 })
  }

  const investor = await prisma.investor.findUnique({
    where: { id: data.investor_id }
  })

  if (!investor) {
    throw Object.assign(new Error('Investor not found'), { statusCode: 404 })
  }

  return prisma.investment.create({
    data: {
      fund_id: data.fund_id,
      investor_id: data.investor_id,
      amount_usd: data.amount_usd,
      investment_date: new Date(data.investment_date)
    }
  })
}



// Returns all investments made in the specified fund
// Returns 404 error if the id doesn't exist
// First check if fund exists to save time
export const getByFundId = async (fundId: string) => {

  const fund = await prisma.fund.findUnique({
    where: { id: fundId }
  })

  if (!fund) {
    throw Object.assign(new Error('Fund not found'), { statusCode: 404 })
  }

  return prisma.investment.findMany({
    where: { fund_id: fundId }
  })
}