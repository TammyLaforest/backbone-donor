import express from 'express';
import bodyParser from 'body-parser'
let router = express.Router();
import { getDonors, newDonor, getOneDonor, deleteDonor, updateDonor } from './controller'

// url: 'http://localhost:3000/api/donors'

router.use(bodyParser.urlencoded({ extended: true }))
router
    .get('/api/donors', getDonors)
    .get('/api/donors/:id', getOneDonor)
    .post('/api/donors', newDonor)
    .delete('/api/donors/:id', deleteDonor)
    .put('/api/donors/:id', updateDonor)

export default router