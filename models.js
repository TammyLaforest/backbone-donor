// Models

let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


app.Donor = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        email: '',
        donations: {}
    }
});

app.Donation = Backbone.Model.extend({
    defaults: {
        donor: "",
        amount: 0,
        dateRecorded: date,
        dateDonated: date,
        purpose: 'any',
        account: 'general'
    }
});