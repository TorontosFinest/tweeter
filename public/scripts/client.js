/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //when document is ready,  hide the error message.
  $(".error").hide();

  //function to create the tweet element. use escape to check for server side scipting and timeago to format the time.
  function createTweetElement(tweetObject) {
    console.log(tweetObject);
    const $tweet = `<article class="tweet">
          <header>
            <div>
          <img src=${tweetObject.user.avatars}>
          <span class="username">${tweetObject.user.name}</span>
          </div>
          <span class="handle">${tweetObject.user.handle}<span>
          
          </header>
      
        <p>${escape(tweetObject.content.text)}</p>
          <footer>
            <span>${timeago.format(tweetObject.created_at)}</span>
            <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
          </footer>
         </article>`;

    return $tweet;
  }

  //when form is submited, prevent refresh

  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    //if the characters are more than 140, slide down the error message slowly
    if ($("#tweet-text").val().length > 140) {
      $(".error").slideDown("slow").text("Too many characters!");
      // if nothing was entered and form was submitted, slide down empty form error.
    } else if (!$("#tweet-text").val()) {
      $(".error")
        .slideDown("slow")
        .text("Silly! You tried entering an empty tweet.");
    } else {
      //else if all is good, then prevent refresh and submit the form.
      event.preventDefault();
      //remove the error message
      $(".error").slideUp("slow");
      // serializes the data ino readable text.
      const serialiedData = $(this).serialize();
      //ajax post method to post the form data.
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets/",
        data: serialiedData,
        success: function (data) {
          //if successful, empty the form after submitted
          $("#tweets-container").empty();
          $("#tweet-form").each(function () {
            this.reset();
          });
          //load the tweets
          loadTweets();
          //reset character counter
          $(".counter").text("140");
        },
      });
    }
  });

  //function redner the tweets and to put newest tweet at top using prepend
  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const $tweetsContainer = $("#tweets-container");
      $tweetsContainer.prepend($tweet);
    }
  }
  // escape function to prevent and check for server side scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //function to load the tweets
  function loadTweets() {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  }
  loadTweets();
});
