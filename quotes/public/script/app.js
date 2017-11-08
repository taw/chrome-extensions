let got_quote = function(data) {
  let text = data.quoteText;
  let author = data.quoteAuthor;
  $("body").append($(`<div class="quote"><div class="text">${text}</div><div class="author">${author}</div></div>`));
}

$(() => {
  let url = "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  $.ajax(url, {success: got_quote});
})
