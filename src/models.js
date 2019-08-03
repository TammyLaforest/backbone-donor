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

const DonationSchema = new Schema({
    owner: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    dateRecorded: {
        type: Date,
        required: true,
    },
    dateDonated: {
        type: Date,
        required: true,
    },
    purpose: {
        type: String,
        required: true
    }
});

export const Donor = mongoose.model('Donor', DonorSchema)

export const Donation = mongoose.model('Donation', DonationSchema)
