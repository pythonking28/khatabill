import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js'
import billbookRouter from './routes/billbookRoute.js'
import customerRouter from './routes/customerRoute.js'
import billRouter from './routes/billRoute.js'
import itemRouter from './routes/itemRoute.js'
import transactionRouter from './routes/transactionRoute.js'

const app = express();

dotenv.config()

//middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const corsConfiguration = {
    origin: "http://localhost:5173",
    credentials:true
}
app.use(cors(corsConfiguration))

//routes
app.use('/api/v1/user', userRouter)

app.use('/api/v1/billbook', billbookRouter)

app.use('/api/v1/customer', customerRouter)

app.use('/api/v1/bill', billRouter)

app.use('/api/v1/item', itemRouter)

app.use('/api/v1/transaction', transactionRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`server running at port ${process.env.PORT}`);
    
})