let got_weather = (data) => {
  let results = data.query.results.channel;
  let html = results.item.description.replace("<![CDATA[", "").replace("]]>", "");
  $("body").append($(html));
}

let got_location = (position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let query = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${lon})")`;
  let url = `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

  $.ajax(url, {success: got_weather});
}

$(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(got_location);
  } else {
    alert("No geolocation in your browser, so no weather for you!");
  }
})
