/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
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

  $("#tweet-form").on("submit", function (event) {
    if ($("#tweet-text").val().length > 140) {
      alert("TOO MANY CHARACTERS!");
    } else if (!$("#tweet-text").val()) {
      alert("TWEET IS EMPTY!");
    } else {
      event.preventDefault();
      console.log("the form was submitted!");
      const serialiedData = $(this).serialize();
      $.ajax({
        method: "POST",
        url: "http://localhost:8080/tweets/",
        data: serialiedData,
        success: function (data) {
          console.log("success!!", data);
          $("#tweets-container").empty();
          $("#tweet-form").each(function () {
            this.reset();
          });
          loadTweets();
        },
      });
    }
  });

  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const $tweetsContainer = $("#tweets-container");
      $tweetsContainer.prepend($tweet);
    }
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function loadTweets() {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  }
  loadTweets();
});
