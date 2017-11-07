let get_dog = function(data) {
  let dog_url = data.message;
  // $("body").append(`<img src="${dog_url}" />`)
  $("body").css("background-image", `url(${dog_url})`)
}

$(() => {
  let url = "https://dog.ceo/api/breeds/image/random";
  $.ajax(url, {success: get_dog});
})
