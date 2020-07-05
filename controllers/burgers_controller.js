var express = require("express");

const router = require("express").Router();

// Import the model (cat.js) to use its database functions.
let burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        res.render("index", { burgerData: data })
    })
})

router.post("/api/burgers", function(req, res) {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(data) {
        console.log("DATA: ", data);
        if (data.affectedRows === 1) {
            console.log("Burger created!")
            res.redirect("/");
        } else {
            console.log("Something went wrong!");
            res.status(404).end();
        }
        // Send back the ID of the new quote
        // res.json({ id: data.insertId });
    });
});
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id=" + req.params.id;
    burger.update({ devoured: req.body.devoured }, condition,
        function(result) {
            console.log("result.affectedRows: ", result.affectedRows);
            if (result.affectedRows === 1) {
                console.log("Devoured successfully!");
                res.sendStatus(200);
            } else {
                console.log("There seems to be a problem");
                res.status(404).end();
            }
        })
})

// Export routes for server.js to use.
module.exports = router;