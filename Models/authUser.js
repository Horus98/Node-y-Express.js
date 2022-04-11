import mongoose from 'mongoose'

const authUserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true }
})

const authUser = mongoose.model('AuthUser', authUserSchema)
export default authUser
