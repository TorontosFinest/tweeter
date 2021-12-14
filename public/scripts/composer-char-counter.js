$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    const input = $(this).val().length;
    let remainder = 140 - input;
    if (remainder > 0) {
      $(this).parent().find(".counter").text(remainder).removeClass("red");
    } else {
      $(this).parent().find(".counter").text(remainder).addClass("red");
    }
  });
});
