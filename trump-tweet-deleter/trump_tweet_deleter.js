function delete_bad_tweets() {
  let tweets = document.querySelectorAll(".stream-item");
  for (let tweet of tweets) {
    if (tweet.innerHTML.indexOf("Trump") !== -1) {
      tweet.remove();
      console.log("Removed a very bad tweet");
    }
  }
}
console.log("Looking for Trump tweets and deleting them")
setInterval(delete_bad_tweets, 1000);
