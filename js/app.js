(function() {

  /**
   * The model
   */

  var UsersModel = Backbone.Model.extend({
    defaults: function() {
      return {
        firstname: "",
        lastname: "",
        email: ""
      }
    }
  });

  /**
   * The collection
   */

  var UsersCollection = Backbone.Collection.extend({
    model: UsersModel,
    comparator: "firstname",
    url: "assets/users.json"
  });

  /*

  var testCollection = new UsersCollection();

  testCollection.fetch({
    success: function() {
      console.log(testCollection);
    }
  });

  */

  /**
   * The users view
   */

  var UsersView = Backbone.View.extend({
    el: "#users__body",

    collection: new UsersCollection(),

    initialize: function() {
      var scope = this;
      this.collection.fetch({
        success: function() {
          scope.render();
        }
      });
    },

    render: function() {
      var scope = this;
      this.collection.forEach(function(model) {
        scope.output(model);
      });
      return this;
    },

    output: function(model) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + model.get("firstname") + "</td>\
                       <td>" + model.get("lastname") + "</td>\
                       <td>" + model.get("email") + "</td>";
      this.el.appendChild(row);
    }
  });

  /**
   * Render app
   */
  
  var app = new UsersView();

})();