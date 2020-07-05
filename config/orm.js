// Import MySQL connection.
var connection = require("./connection.js");

function objToSql(ob) {
    var arr = [];

    // Loops through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    // Translates array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    selectAll: function(tablename, cbModel) {
        connection.query("SELECT * FROM ??", tablename, function(err, data) {
            cbModel(data)
        })
    },

    insertOne: function(tablename, columns, values, cbController) {

        var queryString = "INSERT INTO " + tablename;

        queryString += " (";
        queryString += columns;
        queryString += ")";
        queryString += " VALUES (' ";
        queryString += values;
        queryString += " ') ";

        console.log("THIS IS QUERY STRING " + queryString);


        connection.query(queryString, values, function(err, data) {
            if (err) {
                throw (err);
            }
            cbController(data);


        });
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals.devoured);
        queryString += " WHERE ";
        queryString += condition;

        console.log("queryString: ", queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }

    // updateOne: function(tablename, columns, values, cbModel) {
    // }
}
// Export the orm object for the model (burger.js).
module.exports = orm;