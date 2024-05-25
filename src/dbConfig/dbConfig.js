import mongoose from "mongoose";

export async function connectDb() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('Database connected')
        })


        connection.on('error', (err) => {
            console.log('MongoDb connection error', err)
            process.exit()
        })
    } catch (error) {
        console.log('Something went wrong in connecting to DB', error)
    }
}