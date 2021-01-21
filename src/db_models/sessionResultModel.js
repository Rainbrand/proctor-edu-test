import mongoose from 'mongoose'

const Schema = mongoose.Schema

/**
 * Session Result schema
 */
const sessionResultSchema = new Schema({
    id: String,
    status: String,
    duration: String,
    startedAt: Date,
    stoppedAt: Date,
    score: Number,
    student: String,
    proctor: String
})

export default mongoose.model('sessionResults', sessionResultSchema)
