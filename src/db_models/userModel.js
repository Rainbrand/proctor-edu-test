import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    nickname: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
}, { collection : 'users' })

export default mongoose.model('users', userSchema)
