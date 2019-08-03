import mongoose from 'mongoose';
import validator from 'validator'

let Schema = mongoose.Schema

const DonorSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email Address' })
            }
        }
    },
    donations: {
        type: Array,
        required: false,
    },
});

const Donor = mongoose.model('Donor', DonorSchema)

export default Donor

let donor = new Donor({
    firstName: 'John',
    lastName: "Smith",
    email: "johnsmith@example.com"
})