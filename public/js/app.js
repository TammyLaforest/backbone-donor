// 'use strict'
let app = {}
Backbone.Model.prototype.idAttribute = '_id'

// Models
let today = new Date()
let date = `${today.getFullYear()} - ${(today.getMonth() + 1)} - ${today.getDate()}`

app.Donor = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        email: '',
        donations: []
    }
})

app.Donation = Backbone.Model.extend({
    defaults: {
        owner: "",
        amount: 0,
        dateRecorded: date,
        dateDonated: date,
        purpose: 'any',
    }
})

// Collections
app.DonorList = Backbone.Collection.extend({
    url: 'http://localhost:3000/api/donors'
})

// instance of Collection
app.donorList = new app.DonorList()

_.templateSettings.variable = "rc"

// individual donors rendering
app.DonorView = Backbone.View.extend({
    model: new app.Donor(),
    tagName: 'tr',
    template: _.template($('#donor-list-template').html()),
    initialize: function () {
        this.model.on('add', this.render, this)
        this.model.on('change', this.render, this)
        this.model.on('remove', this.render, this)
    },
    events: {
        'click .edit-donor': 'edit',
        'click .update-donor': 'update',
        'click .cancel': 'cancel',
        'click .delete-donor': 'delete',
        'click .closeInputs': 'cancel',
        'click .resetInputs': 'resetInputs',
        'hidden.bs.modal #exampleModalLong': 'resetInputs'
    },
    edit: function () {
        this.$('.edit-donor').hide()
        this.$('.toggle-donor').hide()
        this.$('.delete-donor').show()
        this.$('.update-donor').show()
        this.$('.cancel').show()
        let firstName = this.model.attributes.firstName
        let lastName = this.model.attributes.lastName
        let email = this.model.attributes.email

        this.$('.firstName').html(`<input type="text" class="form-control firstName-update" value=${firstName} >`)

        this.$('.lastName').html(`<input type="text" class="form-control lastName-update" value=${lastName} >`)

        this.$('.email').html(`<input type="text" class="form-control email-update" value=${email} >`)

        // console.log(`${firstName} ${lastName} ${email} `)

    },
    update: function () {
        console.log(this.model.attributes.firstName)
        let firstName = this.$('.firstName-update').val()
        let lastName = this.$('.lastName-update').val()
        let email = this.$('.email-update').val()
        console.log(lastName)

        this.model.set('firstName', firstName);
        this.model.set('lastName', lastName);
        this.model.set('email', email)

        this.model.save(null, {
            success: function (response) {
                console.log('Successfully UPDATED donor with _id: ' + response.toJSON()._id);
            },
            error: function (err) {
                console.log('Failed to update donor!');
            }
        })
        this.$('.edit-donor').show()
        this.$('.toggle-donor').show()
        this.$('.delete-donor').hide()
        this.$('.update-donor').hide()
        this.$('.cancel').hide()

        this.$('.email').html(this.model.attributes.email)
        this.$('.firstName').html(this.model.attributes.firstName)
        this.$('.lastName').html(this.model.attributes.lastName)
    },
    cancel: function () {
        this.$('.edit-donor').show()
        this.$('.toggle-donor').show()
        this.$('.delete-donor').hide()
        this.$('.update-donor').hide()
        this.$('.cancel').hide()

        this.$('.email').html(this.model.attributes.email)
        this.$('.firstName').html(this.model.attributes.firstName)
        this.$('.lastName').html(this.model.attributes.lastName)
    },
    delete: function () {
        if (confirm("Are you sure you want to delete this donor?")) {
            this.model.destroy({
                success: function (response) {
                    console.log(`Successfully DELETED donor with _id: ${response.toJSON()._id} `)
                },
                error: function (err) {
                    console.log('Failed to delete donor!')
                }
            })

        } else {
            donorsView.render()
        }
    },
    render: function () {
        let donorID = `ID${this.model.attributes._id}`
        let data = {
            _id: this.model.attributes._id,
            firstName: this.model.attributes.firstName,
            lastName: this.model.attributes.lastName,
            email: this.model.attributes.email,

            idModal: `<div class="modal fade" id="${donorID}" tabindex="-1" role="dialog" aria-labelledby="donormodal"
        aria-hidden="true">`,
            idTarget:
                `
            <button type="button"
        class="btn btn-primary toggle-donor"
        data-toggle="modal"
        data-target="#${donorID}">`,
        }

        this.$el.html(this.template(data))
        return this
    }
})

app.DonorsView = Backbone.View.extend({
    el: '#main',
    model: app.donorList,
    initialize: function () {
        this.model.on('add', this.render, this)
        this.model.on('change', this.render, this)
        this.model.on('remove', this.render, this)
        this.model.fetch({
            success: function (response) {
                _.each(response.toJSON(), function (item) {
                    console.log(`Successfully GOT donor with _id: ${item._id} `)
                })
            },
            error: function () {
                console.log("Failed to GET donors")
            }
        })
    },
    render: function () {
        let self = this
        this.$el.html('')
        _.each(this.model.toArray(), function (donor) {
            self.$el.append((new app.DonorView({ model: donor })).render().$el)
        })
        return this
    }
})

let donorsView = new app.DonorsView()

$(document).ready(function () {
    $('.add-donor').on('click', function () {
        let donor = new app.Donor({
            firstName: $('.firstName-input').val().trim(),
            lastName: $('.lastName-input').val().trim(),
            email: $('.email-input').val().trim(),
        })
        app.donorList.add(donor)

        // Clear inputs
        $('.firstName-input').val('')
        $('.lastName-input').val('')
        $('.email-input').val('')

        donor.save(null, {
            success: function (response) {
                console.log(`Successfully SAVED donor with _id: ${response.toJSON()._id} `)
            },
            error: function () {
                console.log('Failed to save donor!')
            }
        })
    })
})
