import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "age": Number,
    "address": String,
    "createdAt": {
        type: Date,
        default: new Date()
    }
})

const user = mongoose.model('user', userSchema)
export default user