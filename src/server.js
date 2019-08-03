import express from 'express'
import mongoose from 'mongoose'
// import bodyParser from 'body-parser'
import router from './router'
import { Donor, Donation } from './models'

const port = 3000
const app = express()

app.use(express.static('public'))

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

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

// let donor = new Donor({
//     firstName: 'Tom',
//     lastName: "Smith",
//     email: "tomsmith@example.com"
// })

// donor.save()

let today = new Date()
let date = `${today.getFullYear()} - ${(today.getMonth() + 1)} - ${today.getDate()}`


// let donation = new Donation({
//     owner: '5d45cd4891a6ef27270bc9ee',
//     amount: 24,
//     dateRecorded: new Date(),
//     dateDonated: new Date(),
//     purpose: 'general donation'
// })

// donation.save()

// db.collection('donors').aggregate([
//     {
//         $lookup:
//         {
//             from: "donations",
//             localField: "_id",
//             foreignField: "owner",
//             as: "donations"
//         }
//     }
// ])
