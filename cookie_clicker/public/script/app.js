// cookie http://www.pngall.com/cookie-png

let get_clicks_count = () => {
  let clicks = window.localStorage.getItem("clicks");
  return (clicks ? parseInt(clicks) : 0);
}

let update_counter = () => {
  $(".count").text(get_clicks_count());
}

let cookie_click = () => {
  window.localStorage.setItem("clicks", get_clicks_count() + 1);
  update_counter();
}

$(() => {
  update_counter();
  $("img").on("click", cookie_click);
})
