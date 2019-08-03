import express from 'express'
import mongoose from 'mongoose'
// import bodyParser from 'body-parser'
import router from './router'
// import Donor from './models'

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

app.use(express.static('public'))

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// let donor = new Donor({
//     firstName: 'John',
//     lastName: "Smith",
//     email: "johnsmith@example.com"
// })

// donor.save()