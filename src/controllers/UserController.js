const UserModel = require('../models/User')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY || "secret",
        {expiresIn: '24h'}
    )
}

class UserController {
    async index(req,res) {
        const users = await UserModel.find({}).populate('tasks').exec()
        res.json({
            data: users
        })
    }

    async register(req,res){
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({ status: 'error', errors: errors.array() });
                return;
            }

            const {name,password,email} = req.body
            let hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await UserModel.create({name,email,password:hashedPassword})
            res.json({
                data:newUser
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }

    async login(req,res){
        try {
            const {email, password} = req.body
            const user = await UserModel.findOne({email:email})

            if (!user) {
                return res.json({
                    msg: "User not found"
                })
            }
            let comparePassword = await bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.json({
                    msg: "incorrect password"
                })
            }
            const token = generateJwt(user._id, user.email)
            return res.json({token})
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}

module.exports = new UserController()