/**
 * The User model
 * 
 * This is how we will model an individual user in our table, with the defaults
 * as blanks.
 */
var User = Backbone.Model.extend({
  defaults: {
    firstname: '',
    lastname: '',
    email: ''
  }
});





/**
 * The Users collection
 *
 * The users collection is a collection of our users based on the User model,
 * and the collection, for the sake of this demo, is retrieved from a generated
 * json list in the assets directory.
 */
var UsersCollection = Backbone.Collection.extend({
  
  model: User,

  url: 'assets/users.json',

  comparator: 'firstname'

});

var Users = new UsersCollection();





/**
 * The Users list
 *
 * The users list is a view that contains all the individual user views. It is,
 * in essence, a parent view for al the users.
 */
var UsersView = Backbone.View.extend({

  el: '#users',

  events: {
    'change #sort': 'sortCollection'
  },

  initialize: function() {
    this.listenTo(Users, 'sort', this.render);
    Users.fetch();
  },

  render: function() {
    this.$('#users-table__body').html('');

    Users.forEach(function(model) {
      var user = new UserView({
        model: model
      });
      $('#users-table__body').append(user.render().el);
    });

    return this;
  },

  sortCollection: function(e) {
    console.log(e.target.value);
    Users.comparator = e.target.value;
    Users.sort();
  }

});





/**
 * The User view
 *
 * The user view is created for each user so that we can add more functionality
 * to each user later on.
 */
var UserView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template($('#user-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});





/**
 * Instantiate the users list which populates the table and gets ready for
 * the action.
 */
new UsersView();