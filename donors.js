
'use strict'
let app = {}

// Models

let today = new Date()
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

Backbone.Model.prototype.idAttribute = '_id'

// const Donor = Backbone.Model.extend({
app.Donor = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        email: '',
        donations: []
    }
});

// const Donation = Backbone.Model.extend({
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

// Collections
// const DonorList = Backbone.Collection.extend({
app.DonorList = Backbone.Collection.extend({
    model: app.Donor,
    localStorage: new Store('backbone-donor'),
    url: 'http://localhost:3000/api/donors'
})

// instance of Collection
app.donorList = new app.DonorList()

// Views

// individual donors rendering
app.DonorView = Backbone.View.extend({
    model: new app.Donor(),
    tagName: 'tr',
    template: _.template($('#donor-list-template').html()),
    events: {
        'dblclick .firstName ': 'edit',
        'dblclick .lastName ': 'edit',
        'dblclick .email': 'edit',
        // 'keypress .edit': 'updateOnEnter',
        // 'blur  edit': 'close',
        'click .edit-donor': 'edit',
        'click .update-donor': 'update',
        'click .cancel': 'cancel',
        'click .delete-donor': 'delete'
    },
    edit: function () {
        $('.edit-donor').hide();
        $('.delete-donor').hide();
        this.$('.update-donor').show();
        this.$('.cancel').show();

        let firstName = this.$('.firstName').html();
        let lastName = this.$('.lastName').html();
        let email = this.$('.email').html();

        this.$('.firstName').html(`<input type="text" class="form-control firstName-update" value=${firstName} >`);

        this.$('.lastName').html(`<input type="text" class="form-control lastName-update" value=${lastName} >`);

        this.$('.email').html(`<input type="text" class="form-control email-update" value=${email} >`);

    },
    update: function () {
        let newName = this.$('.firstName-update').val().trim()
        let oldName = this.model.attributes.firstName.trim()

        if (newName == oldName) {

            console.log("by golly, those match")

            donorsView.render();

        } else {
            console.log("hear ye")
        }
        this.model.set('firstName', newName);
        this.model.set('lastName', this.$('.lastName-update').val().trim());
        this.model.set('email', this.$('.email-update').val().trim())

        this.model.save(null, {
            success: function (response) {
                console.log('Successfully UPDATED donor with _id: ' + response.toJSON()._id);
            },
            error: function (err) {
                console.log('Failed to update donor!');
            }
        });
    },
    cancel: function () {
        donorsView.render();
    },
    close: function () {
        let value = this.input.val().trim()
        if (value) {
            this.model.save({ title: value })
        }
        this.$el.removeClass('editing')
    },
    // updateOnEnter: function (e) {
    //     if (e.which == 13) {
    //         this.close()
    //     }
    // },
    delete: function () {
        this.model.destroy({
            success: function (response) {
                console.log('Successfully DELETED donor with _id: ' + response.toJSON()._id);
            },
            error: function (err) {
                console.log('Failed to delete donor!');
            }
        });
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
    // render: function () {
    //     this.$el.html(this.template(this.model.toJSON()))
    //     this.input = this.$('.edit')
    //     return this
    // },
})


// AppView

app.DonorsView = Backbone.View.extend({
    el: '#main',
    model: app.donorList,
    template: _.template($('#donor-list-template').html()),
    initialize: function () {
        this.model.on('add', this.render, this);
        // app.donorList.on('add', this.render, this);

        this.model.on('change', this.render, this);
        this.model.on('remove', this.render, this);

        // app.donorList.fetch()
        this.model.fetch({
            success: function (response) {
                _.each(response.toJSON(), function (item) {
                    console.log('Successfully GOT Donor with _id: ' + item._id);
                })
            },
            error: function () {
                console.log('Failed to get donors!');
            }
        });
    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function (donor) {
            self.$el.append((new app.DonorView({ model: donor })).render().$el);
        });
        return this;
    }
})

let donorsView = new app.DonorsView();

$(document).ready(function () {
    $('.add-donor').on('click', function () {
        let donor = new app.Donor({
            firstName: $('.firstName-input').val(),
            lastName: $('.lastName-input').val(),
            email: $('.email-input').val(),

        });

        app.donorList.add(donor);
        $('.firstName-input').val('');
        $('.lastName-input').val('');
        $('.email-input').val('');


        donor.save(null, {
            success: function (response) {
                console.log('Successfully SAVED donor with _id: ' + response.toJSON()._id);
            },
            error: function () {
                console.log('Failed to save donor!');
            }
        });
    });
})


// Routers
// app.Router = Backbone.Router.extend({
//     routes: {
//         '*filter': 'setFilter'
//     },

//     setFilter: function (params) {
//         if (params != null) {
//             console.log('app.router.params = ' + params)
//             window.filter = params.trim() || ''
//             app.donorList.trigger('reset')
//         }
//     }
// })

// Initializer

// app.router = new app.Router()
// Backbone.history.start()
// app.donorsView = new app.DonorsView()
