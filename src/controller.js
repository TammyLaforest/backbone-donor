import Donor from './models'

// export const getHome = async (req, res) => res.send('Hello World!')

export const getDonors = async (req, res) => {
    Donor.find(function (err, docs) {
        docs.forEach(function (item) {
            console.log(`Received a GET request for _id:${item._id}`)
        })
        res.send(docs)
    })
}


// export const getHome = async (req, res) => res.send('Hello World!')

// export const getHome = async (req, res) => res.send('Hello World!')

// export const getHome = async (req, res) => res.send('Hello World!')
