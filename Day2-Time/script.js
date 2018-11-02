var timer = document.querySelector(".timer");
var time = timer.innerHTML.split(":");
var mins = parseInt(time[0]);
var secs = parseInt(time[1]);
var ms = parseInt(time[2]);
var fiboUpto = Math.floor(100 + Math.random() * 200);
var timeout;
function updateTimer() {
  displayTimer(mins, secs, ms);
  if (ms > 0) {
    ms--;
    timeout = setTimeout(updateTimer, 10);
  } else if (secs > 0) {
    secs--;
    ms = 99;
    timeout = setTimeout(updateTimer, 10);
  } else if (mins > 0) {
    mins--;
    secs = 59;
    timeout = setTimeout(updateTimer, 10);
  } else {
    alertMe(
      "Opps!! Times up ⏱️!! You could not defuse the bomb in time 😞",
      "red"
    );
    return;
  }
}
function displayTimer(mins, secs, ms) {
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  if (ms < 10) ms = "0" + ms;
  timer.innerHTML = mins + ":" + secs + ":" + ms;
}
updateTimer();
document.querySelector(".defuse").addEventListener("click", function() {
  document.querySelector("#upto").innerHTML = fiboUpto;
  document.querySelector(".question").style.display = "block";
  document.querySelector(".defuse").style.display = "none";
});
document.querySelector("#respond").addEventListener("click", function() {
  var ans = parseInt(document.querySelector("#answer").value);
  if (ans == fiboSum(fiboUpto)) {
    alertMe(
      "Congrats!! You have difused the bomb in time ⏱️ & saved millons of lives 😀.",
      "lime"
    );
  } else {
    alertMe("Opps!! Bomb exploded as you typed the wrong answer 😞.", "red");
  }
});
function fiboSum(upto) {
  var i = 0,
    j = 1,
    sum = 0,
    temp = 1;
  while (j <= upto) {
    sum += j;
    console.log(j);
    temp = j;
    j = i + j;
    i = temp;
  }
  return sum;
}
function alertMe(message, color) {
  clearTimeout(timeout);
  document.querySelector(".alert").style.color = color;
  document.querySelector(".alert").innerHTML = "<h1>" + message + "</h1>";
  document.querySelector(".alert").style.visibility = "visible";
}
