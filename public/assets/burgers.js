$(function() {

    $(".devoured").on("click", function(event) {
        console.log($(this).data("id"));
        console.log("This parent: ", $(this).parent().attr('id'));
        var id = $(this).data("id");
        var devoured = {
            devoured: { devoured: true }
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devoured
        }).then(
            function() {
                console.log("Did I make it?");
                location.reload();

            })
    });

    $(".submitBtn").on("click", function(event) {
        event.preventDefault();

        var newDevoured = {
            burger_name: $("#form").val().trim(),
            devoured: { devoured: false }
        };

        //   var devouredState = {devoured:false}

        // Send the PUT request.
        $.ajax("/api/burgers/", {
            type: "POST",
            data: newDevoured
        }).then(
            function() {
                console.log("newDevoured", newDevoured);
                console.log("Changed devoured to ", newDevoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    // $(".devoured").on("click", function(event) {
    //   // Make sure to preventDefault on a submit event.
    //   event.preventDefault();

    //   var newCat = {
    //     name: $("#ca").val().trim(),
    //     sleepy: $("[name=sleepy]:checked").val().trim()
    //   };

    //   // Send the POST request.
    //   $.ajax("/api/cats", {
    //     type: "POST",
    //     data: newCat
    //   }).then(
    //     function() {
    //       console.log("created new cat");
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });


});