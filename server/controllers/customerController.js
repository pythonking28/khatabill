import { pool } from "../config/db.js";


export const createCustomer = async (req, res) => {
    const { name, contact="none", address="none" } = req.body;
    if(!name){
        return res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }

    try {
        const data = await pool.query('INSERT INTO Customers (name,contact,address) VALUES ($1,$2,$3) RETURNING *',[name, contact, address]);
        if(!data.rows.length){
            return res.status(500).json({
                message: `Failed to create customer ${name} profile`,
                success: false
            })
        }
        return res.status(201).json({
            message: `Profile ${name} created successfully`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }

}

export const getCustomerDetail = async (req, res) => {
    const {customerId} = req.params
    if(!customerId){
        return res.status(400).json({
            message: "Custome Id not provided",
            success: false
        })
    }
    try {
        const data = await pool.query('SELECT * FROM Customers WHERE customer_id = $1', [customerId]);
        if(!data.rows.length){
            return res.status(400).json({
                message: "Customer does not exist",
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

export const updateCustomer = async (req, res) => {
    const {name, contact = "none", address = "none"} = req.body;
    const {customerId} = req.params;

    if(!name){
        return res.status(400).json({
            message: "All Fields required",
            success: false
        })
    }
    try {
        const customer = await pool.query('SELECT * FROM Customers WHERE customer_id = $1', [customerId])
        if(!customer.rows.length){
            return res.status(404).json({
                message: "Customer not found",
                success: false
            })
        }
        const data = await pool.query('UPDATE Customers SET name = $1, contact = $2, address = $3 WHERE customer_id = $4 RETURNING *',[name, contact, address, customerId]);
        if(!data.rows.length){
            return res.status(500).json({
                message: `Failed to update customer ${customer.rows[0].name}`,
                success: false
            })
        }
        return res.status(200).json({
            message: `Customer ${data.rows[0].name} updated successfully`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}