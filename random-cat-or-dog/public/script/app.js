let got_dog = function(data) {
  $("body").css("background-image", `url(${data.message})`)
}

$(() => {
  if(Math.random() > 0.5) {
    $("body").css("background-image", `url(http://thecatapi.com/api/images/get)`)
  } else {
    $.ajax("https://dog.ceo/api/breeds/image/random", {success: got_dog});
  }
})
