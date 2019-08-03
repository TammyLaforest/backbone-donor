import express from 'express';
import bodyParser from 'body-parser'
let router = express.Router();
import { getDonors, newDonor, deleteDonor, updateDonor } from './controller'

// url: 'http://localhost:3000/api/donors'

router.use(bodyParser.urlencoded({ extended: true }))
router
    .get('/api/donors', getDonors)
    .post('/api/donors', newDonor)
    .delete('/api/donors/:id', deleteDonor)
    .put('/api/donors/:id', updateDonor)

export default router