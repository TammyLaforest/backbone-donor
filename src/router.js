import express from 'express';
import bodyParser from 'body-parser'
let router = express.Router();
import { getDonors } from './controller'
import Donor from './models'

// url: 'http://localhost:3000/api/donors'

router.use(bodyParser.urlencoded({ extended: true }))
router
    .get('/api/donors', getDonors)
    .post('/api/donors', function (req, res) {
        console.log(`Received a POST request`)
        for (let key in req.body) {
            console.log(`${key}:${req.body[key]}`)
        }
        let donor = new Donor(req.body)
        donor.save(function (err, doc) {
            res.send(doc)
        })
    })
    .delete('/api/donors/:id', function (req, res) {

        console.log(`Received a DELETE request for ${req.params.id}`)
        Donor.deleteOne({ _id: req.params.id },
            function (err) {
                res.send({ _id: req.params.id })
            }
        )
    })
    .put('/api/donors/:id', function (req, res) {
        console.log(`Received an UPDATE request for id: ${request.params.id}`)
        Donor.update({ _id: req.params.id },
            req.body, function (err) {
                res.send({ _id: req.params.id })
            })
    })


export default router


    // .get('/api/donors', function (req, res) {
    //     Donor.find(function (err, docs) {
    //         docs.forEach(function (item) {
    //             console.log(`Received a GET request for _id:${item._id}`)
    //         })
    //         res.send(docs)

    //     })
    // })