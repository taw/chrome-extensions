let got_joke = function(data) {
  let setup = data.setup;
  let punchline = data.punchline;
  $("body").append($(`<div><div class="setup">${setup}</div><div class="punchline">${punchline}</div></div>`));
  setTimeout(function(){
    $(".punchline").addClass("visible");
  }, 1000);
}

$(() => {
  let url = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke";
  $.ajax(url, {success: got_joke});
})
