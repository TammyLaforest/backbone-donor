import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './router'

const port = 3000

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const db = mongoose.connection
db
    .once('open', () => console.log('mongodb is connected'))
    .on('error', err =>
        console.error(err)
    )

const app = express()

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})