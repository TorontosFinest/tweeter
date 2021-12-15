/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  //   function createTweetElement(tweetObject) {
  //     console.log(tweetObject);
  //     const $tweet = `<article class="tweet">
  //     <header>
  //       <i class="far fa-grin-squint" data-src=${tweetObject.user.avatars}>${
  //       tweetObject.user.name
  //     }</i>
  //       <span>${tweetObject.user.handle}</span>
  //     </header>

  //     <p>${tweetObject.content.text}</p>
  //     <footer>
  //       <span>${timeago.format(tweetObject.created_at)}</span>
  //       <div>
  //         <i class="fas fa-flag"></i>
  //         <i class="fas fa-retweet"></i>
  //         <i class="fas fa-heart"></i>
  //       </div>
  //     </footer>
  //   </article>;`;

  //     return $tweet;
  //   }

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
        
        <p>${tweetObject.content.text}</p>
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

  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const $tweetsContainer = $("#tweets-container");
      $tweetsContainer.prepend($tweet);
    }
  }

  renderTweets(data);
});
