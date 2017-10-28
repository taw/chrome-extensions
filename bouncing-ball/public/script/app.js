let random_number = (min, max) => {
  return min + Math.floor(Math.random() * (max-min+1));
}

let random_color = () => {
  let r = random_number(0, 255);
  let g = random_number(0, 255);
  let b = random_number(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

$(() => {
  $(".area").css("background-color", random_color());
  $("circle").css("fill", random_color());
  let r = 40;
  let w = $(".area").width();
  let h = $(".area").height();

  let random_x = () => random_number(r, w-r);
  let random_y = () => random_number(r, h-r);
  let move_to_random_position = () => {
    $("circle").animate({cx: random_x(), cy: random_y()}, 500);
  }

  $("circle").css({cx: random_x(), cy: random_y()});
  move_to_random_position();
  setInterval(move_to_random_position, 500);
})
