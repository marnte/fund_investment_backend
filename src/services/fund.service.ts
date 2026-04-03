import { prisma } from "../prisma/prisma"

//Creates a fund in the db 
export const create = async (data: {
  name: string
  vintage_year: number
  target_size_usd: number
  status: string
}) => {

  return prisma.fund.create({
    data: {
        name: data.name,
        vintage_year: data.vintage_year,
        target_size_usd: data.target_size_usd,
        status:  data.status
    }
  })
}


//Returns all the funds with all the specifications from db
export const getAll = async () => {
  return prisma.fund.findMany({
    orderBy: {
      created_at: 'desc'
    }
  })
}


//Returns all data from the fund with the particular id
export const getById = async (id: string) => {
  return prisma.fund.findUnique({
    where: { id }
  })
}


//Returns the updated row in the db (the updated fund)
export const update = async (id: string, data: any) => {
    const existingFund = await prisma.fund.findUnique({
      where: { id },
    });

    if (!existingFund) {
      throw Object.assign(new Error('Fund not found'), { statusCode: 404 })
    }
    
    return await prisma.fund.update({
      where: { id },
      data
    })
}