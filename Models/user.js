import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    
    "firstName": { type : String, required : true },
    "lastName": { type : String, required : true },
    "age": { type : Number, required : true },
    "address": { type : String, required : true },
    "createdAt": {
        type: Date,
        default: new Date()
    }
})

const user = mongoose.model('user', userSchema)
export default user