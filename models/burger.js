// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");


var burger = {
    selectAll: function(cbController) {
      orm.selectAll ("burgers", function(data){
        cbController(data)  
      })  
    },
// The variables cols and vals are arrays.
    insertOne: function(columns, values, cbController) {
      orm.insertOne("burgers", columns, values, function(data) {
        cbController(data);
      });
    },

    update: function(objColVals, condition, cb) {
       orm.update("burgers", objColVals, condition, function(data) {
           cb(data);
       });
   },


};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;