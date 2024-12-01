import { pool } from '../config/db.js'


export const createItem = async(req, res) => {
    const { billId, description, quantity, weight, rate, price} = req.body;
    const userId = req.userId;
    if(!billId || !description || !quantity || !weight || !rate || !price){
        return res.status(400).json({
            message:"All Fields are required",
            success: false
        })
    }
    try {
        const data = await pool.query('INSERT INTO Items (bill_id,user_id,description,quantity,weight,rate,price) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',[billId,userId,description,quantity,weight,rate,price]);
        if(!data.rows.length){
            return res.status(500).json({
                message: "Failed to create items",
                success: false
            })
        }
        return res.status(200).json({
            message: "Item created successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getItemsByBill = async (req,res) => {
    const {billId} = req.params;
    const userId = req.userId;
    try {
        const data = await pool.query('SELECT * FROM Items WHERE bill_id = $1 AND user_id = $2', [billId, userId]);
        if(!data.rows.length){
            return res.status(404).json({
                message: "No items found",
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
