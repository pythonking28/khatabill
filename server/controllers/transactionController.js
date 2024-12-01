import { pool } from '../config/db.js'


export const createTransaction = async(req, res) => {
    const {billId,billbookId, amountPaid, notes = "Note is empty.", date} = req.body;
    const userId = req.userId;
    try {
        const bill = await pool.query('SELECT * FROM Bills WHERE bill_id = $1 AND user_id = $2', [billId, userId]);
        if(!bill.rows.length){
            return res.status(404).json({
                message: "Bill does not exist",
                success: false
            })
        }
        const data = await pool.query('INSERT INTO Transactions (bill_id,user_id,billbook_id, amount_paid, notes, payment_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[billId,userId,billbookId,amountPaid, notes, date]);
        if(!data.rows.length){
            return res.status(500).json({
                message: "Failed to create transaction",
                success: false
            })
        }
        return res.status(200).json({
            message: "Transaction created successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getTransactionByBill = async (req,res) => {
    const {billId} = req.params;
    const userId = req.userId;
    try {
        const data = await pool.query('SELECT * FROM Transactions WHERE bill_id = $1 AND user_id = $2', [billId, userId]);
        if(!data.rows.length){
            return res.status(404).json({
                message: "No transactions found",
                success: false
            })
        }
        return res.status(200).json({
            message: data.rows,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getAllTransaction = async (req,res) => {
    const userId = req.userId;
    try {
        const data = await pool.query('SELECT * FROM Transactions WHERE user_id = $1', [userId]);
        if(!data.rows.length){
            return res.status(404).json({
                message: "No transactions found",
                success: false
            })
        }
        return res.status(200).json({
            message: data.rows,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateDueAmount = async() => {

}