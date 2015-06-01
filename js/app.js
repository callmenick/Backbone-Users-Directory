/**
 * The User model
 * 
 * This is how we will model an individual user in our table, with the defaults
 * as blanks.
 */
var User = Backbone.Model.extend({

  // Sets up some defaults for our model.
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
  
  // Defines the model that the collection will use.
  model: User,

  // Defines the url that the initial data will be read from.
  url: 'assets/users.json',

  // Defines the initial comparator, which governs the way the collection is
  // initially sorted.
  comparator: 'firstname',

  // Sets up some stuff in the initializer function. This runs every time a new
  // instance of the collection is called.
  initialize: function() {
    // Cache a variable for filtered versions of the collection.
    this.filteredCollection = new Backbone.Collection(this.model);
  }

});





/**
 * Create a new instance of the UsersCollection
 */
var Users = new UsersCollection();





/**
 * The Users list
 *
 * The users list is a view that contains all the individual user views. It is,
 * in essence, a parent view for al the users.
 */
var UsersView = Backbone.View.extend({

  // Defines the element for which the view will be based on.
  el: '#users',

  // Defines the collection that the view will utilize.
  collection: Users,

  events: {
    'change #sort': 'sortCollection',
    'keyup #search': 'filterCollection'
  },

  // Initializes the view by setting up some listeners and fetching the
  // collection.
  initialize: function() {
    this.listenTo(this.collection, 'sort', this.render);
    this.collection.fetch();
  },

  // Renders the full view.
  render: function(collection) {
    // Clears the HTML.
    this.$('#users-table__body').html('');

    // Loops over the collection and renders individual views to append to the
    // table body.
    collection.forEach(function(model) {
      var user = new UserView({
        model: model
      });
      $('#users-table__body').append(user.render().el);
    });

    return this;
  },

  // Re-sorts the collection. This gets called when the dropdown is changed,
  // triggering a `sort` listener, which re-renders the view.
  sortCollection: function(e) {
    this.collection.comparator = e.target.value;
    this.collection.sort();
  },

  // Filters the collection. This gets called when a keyup is fired from the
  // events listed in the view. The value of the keyup is retrieved, and the
  // results are filtered from the original collection.
  // 
  // These results are passed into the filteredCollection. That collection is
  // then reset, and passed back into the render function.
  filterCollection: function(e) {
    var str = e.target.value.toLowerCase();

    var filteredResults = this.collection.filter(function(item) {
      return item.get('firstname').toLowerCase().indexOf(str) >= 0;
    });

    this.collection.filteredCollection.reset(filteredResults);
    this.render(this.collection.filteredCollection);
  }

});





/**
 * The User view
 *
 * The user view is created for each user so that we can add more functionality
 * to each user later on.
 */
var UserView = Backbone.View.extend({

  // The generated tag to which views are built onto.
  tagName: 'tr',

  // The template used to render the HTML.
  template: _.template($('#user-template').html()),

  // Renders the view based on the model attributes.
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