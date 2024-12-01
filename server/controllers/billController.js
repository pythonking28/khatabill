import { pool } from "../config/db.js";

export const createBill = async (req, res) => {
    const {billbookId, customerName,billNumber, totalAmount, dueAmount, status,isPending, discount=0, date} = req.body;
    const userId = req.userId


    if(!billNumber || !totalAmount || !status || !date || dueAmount < 0){
        return res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }
    try {
        const bill = await pool.query('SELECT * FROM Bills WHERE  bill_number = $1 AND user_id = $2', [billNumber, userId]);
        if(bill.rows.length){
            return res.status(404).json({
                message: "Bill Already Exists",
                success: false
            })
        }
        console.log()
        const data = await pool.query('INSERT INTO Bills (billbook_id, customer_name,user_id, bill_number,original_amount,due_amount, status,pending, discount, created_at) VALUES ($1,$2,$3, $4, $5, $6, $7,$8,$9,$10) RETURNING *',[billbookId, customerName,userId, billNumber, totalAmount, dueAmount, status,isPending, discount, date])
        if(data.rows.legth == 0){
            return res.status(500).json({
                message: "Failed to create Bill",
                success: false
            })
        }
        return res.status(201).json({
            message: "Bill created successfully",
            data: data?.rows[0]?.bill_id,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getAllBill = async(req, res) => {
    const userId = req.userId;

    try {
        const bills = await pool.query('SELECT * FROM Bills WHERE user_id = $1', [userId])
        if(!bills.rows.length) {
            return res.status(404).json({
                message: "No bills available",
                success: false
            })
        }
        return res.status(200).json({
            bills: bills.rows,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getBillByBillbook = async(req, res) => {
    const userId = req.userId;
    const {billbookId} = req.params

    try {
        const bills = await pool.query('SELECT * FROM Bills WHERE billbook_id = $1 AND user_id = $2', [billbookId, userId])
        if(!bills.rows.length) {
            return res.status(404).json({
                message: "No bills available",
                success: false
            })
        }
        return res.status(200).json({
            bills: bills.rows,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getBillDetails = async(req, res) => {
    const userId = req.userId;
    const {billId} = req.params

    try {
        const bills = await pool.query('SELECT * FROM Bills WHERE bill_id = $1 AND user_id = $2', [billId, userId])
        if(!bills.rows.length) {
            return res.status(404).json({
                message: "No bills available",
                success: false
            })
        }
        return res.status(200).json({
            bills: bills.rows,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteBill = async (req, res) => {
    const {billId} = req.params;
    const userId = req.userId;
    try {
        const bill = await pool.query('SELECT * FROM Bills WHERE bill_id = $1 AND user_id = $2', [billId, userId]);
        if(!bill.rows.length){
            return res.status(404).json({
                message: "Bill not available",
                success: false
            })
        }
        const data = await pool.query('DELETE FROM Bills WHERE bill_id = $1 AND user_id = $2', [billId, userId]);
        if(!data.rowCount){
            return res.status(500).json({
                message: `Failed to delte bill`,
                success: false
            })
        }
        return res.status(200).json({
            message: `Bill deleted successfully`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const updateBill = async (req, res) => {
    const {billId,originalAmount, dueAmount,customerName} = req.body;
    const userId = req.userId;
    try {
        const bill = await pool.query('SELECT * FROM Bills WHERE bill_id = $1 AND user_id = $2', [billId, userId]);
        if(!bill.rows.length){
            return res.status(404).json({
                message: "Bill not available",
                success: false
            })
        }
        const data = await pool.query('UPDATE Bills SET original_amount = $1, due_amount = $2, customer_name = $3 WHERE bill_id = $4 AND user_id = $5 RETURNING *', [originalAmount, dueAmount,customerName, billId, userId]);
        if(!data.rowCount){
            return res.status(400).json({
                message: `Failed to update bill`,
                success: false
            })
        }
        return res.status(200).json({
            message: `Bill updated successfully`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}