import mongoose from 'mongoose'

const Schema = mongoose.Schema

const courseSchema = new Schema({
    questions: [{
        text: String,
        rightAnswerIndex: Number,
        answers: [
            {
                text: String
            }
        ]
    }],
})

export default mongoose.model('courses', courseSchema)
