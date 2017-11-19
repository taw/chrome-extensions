let api_key = "TUJxSCAfcSaSfhveG4vreR0vpcSScqyK";

let url = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=&rating=PG-13`;

let got_giphy = function(data) {
  let video_url = data["data"]["image_mp4_url"];
  let image_url = data["data"]["image_url"];
  $("body").append($(`<img src="${image_url}" alt="">`));
}

$(() => {
  $.ajax(url, {success: got_giphy});
})
