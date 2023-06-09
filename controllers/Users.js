import Users from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();



export const Register = async(req, res) => {
    const { name, email, password, confirmPass} = req.body
    if(password !== confirmPass) {
        return res.status(400).json({message: "Password and confirmPass Password don't match"})
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const existingUser = await Users.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email address already exists" });
        }
        await Users.create({
            name: name,
            email: email,
            password: hashPassword 
        })
        res.json({message: "Successful register"})
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) return res.status(400).json({message: "Wrong Password"})
        
        const userId = user[0].id
        const name = user[0].name
        const email = user[0].email

        const accessToken = jwt.sign( { userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        const refreshToken = jwt.sign( { userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true
        })
        res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data : {
                    "accessToken": accessToken
            }});
    } catch (error) {
        return res.status(404).json({ message: "Email not found" });
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    })
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await Users.update({refresh_token:null}, {
        where: {
            id:userId
        }
    })
    res.clearCookie('refreshToken')
    return res.status(200).json({ message: "Successfull Logout" });
    
}