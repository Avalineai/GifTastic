$(document).ready(function () {
    var pageTitleImg = $("<img class='titleimg' src='assets/images/GOTgif-img.png'>")
    $("#gif-display").prepend(pageTitleImg)

    var topicArr = ["Tyrion Lannister", "Daenerys Targaryen", "Jon Snow", "Arya Stark", "Brienne of Tarth", "Bronn", "Cercei Lannister", "Jaime Lanniser", "Lord Varys", "Samwell Tarly"]

    function displayGifs() {
        var gifTopic = $(this).attr("data-name");
        console.log(this)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifTopic + " Game of Thrones" + "&api_key=yUOI8aYAh8ZQWEUDV5faMxqctKGBUNUX&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#gifs-returned").empty()
            console.log("initial response: ", response)
            var resultsArr = response.data
            console.log("resultsArr: ", resultsArr)
            resultsArr.forEach(function (result) {
                console.log(result.images.fixed_height.url)

                var newDiv = $('<div>')
                var ratingDiv = $('<div class="ratingDiv"></div>')
                console.log(result.rating)
                var imgGif = $(`<img class='gif' data-state='animate' data-animate=${result.images.fixed_height.url} src=${result.images.fixed_height.url} data-state='still' data-still=${result.images.fixed_height_still.url}>`)
                console.log(result.images.fixed_height_still.url)
                ratingDiv.text("Rating: "+ result.rating)
                newDiv.append(imgGif)
                newDiv.append(ratingDiv)
                $("#gifs-returned").prepend(newDiv)

            })
        })
    }

    function topicButtons() {
        $("#gif-buttons").empty();
        topicArr.forEach(function (topic) {

            var addbutton = $("<button>")
            addbutton.addClass("got-gif")
            addbutton.attr("data-name", topic)
            addbutton.text(topic)
            $("#gif-buttons").append(addbutton)
        })
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var newTopic = $("#gif-input").val().trim();
        console.log(newTopic)
        if (newTopic === '') {
            $("#gif-input").val('')
        } else {
        topicArr.push(newTopic);
        }
        $("#gif-input").val('')
        topicButtons();
    })

    topicButtons();

    $(document).on("click", ".got-gif", displayGifs);
    $(document).on("click", ".gif", function () {
        console.log(this)
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })
})