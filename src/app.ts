import express from 'express'
import fundRoutes from './routes/fund.routes'
import investorRoutes from './routes/investor.routes'
import investmentRoutes from './routes/investment.routes'

const app = express()

app.use(express.json())

app.use('/funds', fundRoutes)
app.use('/investors', investorRoutes)
app.use('/', investmentRoutes)

export default app