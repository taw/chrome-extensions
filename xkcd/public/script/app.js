let got_xkcd = function(data) {
  let img = data.img;
  let title = data.title;
  $("body").append($(`<div><img src="${img}"/><h3>${title}</h3></div>`))
  console.log(data);
}

$(() => {
  let last = 1912; // this should be updated automatically
  let id = 1 + Math.floor(Math.random() * last);
  let url = `https://cors.now.sh/https://xkcd.com/${id}/info.0.json`
  $.ajax(url, {success: got_xkcd});
})
