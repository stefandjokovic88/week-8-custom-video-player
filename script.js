document.addEventListener("DOMContentLoaded", () => {

const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const x3 = document.getElementById("x3");
const progress = document.getElementById("progress");
const percentage = document.getElementById("percentage");

function playVideo() {
    video.play();
}

function pauseVideo() {
    video.pause();
    console.log(video.currentTime);
}

function stopVideo() {
    video.currentTime = 0;
}

function videoSpeedX3() {
    video.playbackRate = 3;
}

function videoTime() {
    video.addEventListener("timeupdate", progressBar);
}

function progressBar() {
 progress.value = video.currentTime;
 progress.max = video.duration;

 percentage.innerHTML = (progress.value/progress.max)*100 + "%";
}

play.addEventListener("click", playVideo);
video.addEventListener("click", pauseVideo);
stop.addEventListener("click", stopVideo);
x3.addEventListener("click", videoSpeedX3);
window.onload = videoTime(); 
});