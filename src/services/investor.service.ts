import { prisma } from '../prisma/prisma'


// Creates an investor if the email doesn't already exist in the database
export const create = async (data: {
  name: string
  investor_type: string
  email: string
}) => {

  const existing = await prisma.investor.findUnique({
    where: { email: data.email }
  })

  if (existing) {
    throw Object.assign(new Error('Investor already exists'), { statusCode: 404 })
  }

  return prisma.investor.create({
    data: {
      name: data.name,
      investor_type: data.investor_type,
      email: data.email
    }
  })
}


// Returns all the investors and the details, from the last investor added
export const getAll = async () => {
  return prisma.investor.findMany({
    orderBy: {
      created_at: 'desc'
    }
  })
}