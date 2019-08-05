import { Donor, Donation } from './models'
import bodyParser from 'body-parser'

export const getDonors = async (req, res) => {
    Donor.find(function (err, docs) {
        docs.forEach(function (item) {
            console.log(`Received a GET request for _id:${item._id}`)
        })
        res.send(docs)
    })
}

export const newDonor = async (req, res) => {
    console.log(`Received a POST request`)
    for (let key in req.body) {
        console.log(`${key}:${req.body[key]}`)
    }
    let donor = new Donor(req.body)
    donor.save(function (err, doc) {
        res.send(doc)
    })
}

export const deleteDonor = async (req, res) => {
    console.log(`Received a DELETE request for ${req.params.id}`)
    Donor.deleteOne({ _id: req.params.id },
        function (err) {
            res.send({ _id: req.params.id })
        }
    )
}

export const updateDonor = async (req, res) => {

    try {
        Donor.updateOne({ _id: req.params.id },
            req.body, function (err) {
                res.send({ _id: req.params.id })
            })
        console.log(`Server Received an UPDATE request for id: ${req.params.id}`)
    }
    catch (err) {
        console.log(err)
    }
}