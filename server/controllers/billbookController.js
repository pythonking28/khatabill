import { pool } from "../config/db.js";

export const createBillBook = async (req, res) => {
    const {title, totalPages, date } = req.body;
    const userId = req.userId
    if(!title || !totalPages || !date){
        return res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }
    try {
        const data = await pool.query('INSERT INTO Billbooks (user_id,title,total_pages,created_at) VALUES ($1,$2,$3,$4) RETURNING *',[userId, title, totalPages,date])
        if(data.rows.legth == 0){
            return res.status(500).json({
                message: "Failed to create Billbook",
                success: false
            })
        }
        return res.status(201).json({
            message: "Billbook created successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getAllBillbooks = async(req, res) => {
    const userId = req.userId;

    try {
        const billbooks = await pool.query('SELECT * FROM BILLBOOKS WHERE user_id = $1', [userId])
        if(!billbooks.rows.length) {
            return res.status(404).json({
                message: "No billbook available",
                success: false
            })
        }
        return res.status(200).json({
            billbook: billbooks.rows,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateBillbook = async (req, res) => {
    const { billbookId } = req.params;
    const userId = req.userId;
    const {title, totalPages} = req.body;
    try {
        const billBook = await pool.query('SELECT * FROM Billbooks WHERE billbook_id = $1 AND user_id = $2', [billbookId, userId]);
        if(!billBook.rows.length){
            return res.status(404).json({
                message: "Billbook not available",
                success: false
            })
        }
        const data = await pool.query('UPDATE Billbooks SET title = $1, total_pages = $2 WHERE billbook_id = $3 AND user_id = $4 RETURNING *', [title, totalPages, billbookId, userId]);
        if(!data.rows.length){
            return res.status(500).json({
                message: "Failed to update billbook",
                success: false
            })
        }
        return res.status(200).json({
            message: `Billbook ${data.rows[0].title} updated successfully`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteBillbook = async (req, res) => {
    const {billbookId} = req.params;
    const userId = req.userId;
    try {
        const billBook = await pool.query('SELECT * FROM Billbooks WHERE billbook_id = $1 AND user_id = $2', [billbookId, userId]);
        if(!billBook.rows.length){
            return res.status(404).json({
                message: "Billbook not available",
                success: false
            })
        }
        const data = await pool.query('DELETE FROM Billbooks WHERE billbook_id = $1 AND user_id = $2', [billbookId, userId]);
        if(!data.rowCount){
            return res.status(500).json({
                message: `Failed to delte Billbook ${billBook.rows[0].title}`,
                success: false
            })
        }
        return res.status(500).json({
            message: `Billbook ${billBook.rows[0].title} deleted successfully`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}