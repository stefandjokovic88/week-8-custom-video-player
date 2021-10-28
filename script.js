document.addEventListener("DOMContentLoaded", () => {

const video = document.getElementById("video");
const playPause = document.getElementById("play-pause");
const stop = document.getElementById("stop");
const progressBar = document.getElementById("progress-bar");
const progressBarFilled = document.getElementById("progress-bar-filled");
const speed = document.querySelectorAll(".speed");
const fullScreen = document.getElementById("full-screen");
const volumeBtn = document.getElementById("volume-btn");
const volume = document.getElementById("volume");
const container = document.getElementById("container");
const settings = document.getElementById("settings");
const speedMenu = document.getElementById("speed-menu");
const current = document.getElementById("current");
const duration = document.getElementById("duration");


// play and pause video on Play/Pause button
function playPauseVideo() {
    if(video.paused) {
      video.play();
      playPause.src = "images/pause.png";
    } else {
      video.pause();
      playPause.src = "images/play.png";
    }
  }

playPause.addEventListener("click", playPauseVideo);
video.addEventListener("click", playPauseVideo);

// play and pause video on Spacebar
function playPauseOnSpace(e) {
    if(e.keyCode === 32) {
        if (video.paused) {
            video.play();
            playPause.src = "images/pause.png";
        }
        else {
            video.pause();
            playPause.src = "images/play.png";
        }
    }
}

window.addEventListener("keydown", playPauseOnSpace);

// stop video on button click
function stopVideo() {
    if(video.paused) {
        video.currentTime = 0;
    }
    else {
        video.currentTime = 0;
        video.pause();
        playPause.src = "images/play.png";
    }
    
}

stop.addEventListener("click", stopVideo);

// stop video using "V" on keyboard
function stopVideoOnKeyboard(e) {
    if(e.keyCode === 86)
        stopVideo();
}

window.addEventListener("keydown", stopVideoOnKeyboard);


// change video speed
function videoSpeed(buttonContent) {
    
    let speedNum = buttonContent.substring(0, buttonContent.length-1);
    video.playbackRate = speedNum;
}

speed.forEach(button => {
             button.addEventListener('click', () => {
               videoSpeed(button.textContent);
           })
          })


// skip video by clicking on progress bar
function videoTime() {
    video.addEventListener("timeupdate", fillProgressBar);
}

window.onload = videoTime(); 

// fill progress bar when video is playing
function fillProgressBar() {
    progressBarFilled.style.width = video.currentTime/video.duration*100 + "%";
}

//change video time by clicking on progress bar
function changeVideoTime(e) {
    const newTime = e.offsetX * video.duration / progressBar.offsetWidth;
    video.currentTime = newTime;
}

progressBar.addEventListener("click", changeVideoTime);

// skip video for 10s using "left" and "right" arrows on keyboard
function skipVideo(e) {
    if(e.keyCode === 39) 
        video.currentTime = video.currentTime + 10;
    else if(e.keyCode === 37) 
        video.currentTime = video.currentTime - 10;
}

window.addEventListener("keydown", skipVideo);

// toggle full screen icon
function changeFullScreenIcon(e) {
    // document.fullscreenElement will point to the element that
    // is in fullscreen mode if there is one. If not, the value
    // of the property is null
    if (document.fullscreenElement) {
      fullScreen.src = "images/exit-full-screen.png";
    } else {
      fullScreen.src = "images/full-screen.png";
    }
}

container.addEventListener("fullscreenchange", changeFullScreenIcon);

// toggle video full screen
function toggleFullScreen (event) {
    if (document.fullscreenElement) {
      // exitFullscreen is only available on the Document object
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
}

fullScreen.addEventListener("click", toggleFullScreen);


//volume

// mute or unmute volume on button click
function mute() {
    
    if(video.muted) {
        video.muted = false;
        volumeBtn.style.opacity = 1;
        volumeBtn.src = "images/volume.png";
        volume.value = 100;
        changeVolume();
    }
    else {
        var x = video.volume;
        video.muted = true;
        volumeBtn.style.opacity = 0.5;
        volumeBtn.src = "images/muted.png";
        volume.value = 0;
        changeVolume();
    }
}
volumeBtn.addEventListener("click", mute);

// mute or unmute volume using "M" on keyboard
function muteVideoOnKeyboard(e) {
    if(e.keyCode === 77)
        mute(); 
}

window.addEventListener("keydown", muteVideoOnKeyboard);

// change volume on mouse move
function changeVolume() {
    video.volume = volume.value/100;

    if (video.volume == 0) {
        volumeBtn.style.opacity = 0.5;
        volumeBtn.src = "images/muted.png";
    }
    else {
        volumeBtn.style.opacity = 1;
        volumeBtn.src = "images/volume.png";
    }
}
volume.addEventListener("change", changeVolume);

//change volume using "up" and "down" arrows on keyboard
function changeVolumeOnKeyboard(e) {
    if(e.keyCode === 38) {
        if(video.volume <= 0.9) {
            video.volume = video.volume + 0.1;
            volume.value = video.volume * 100;
            volumeBtn.style.opacity = 1;
            volumeBtn.src = "images/volume.png";
        }
        else {
            video.volume = 1;
            volume.value = 100;
            volumeBtn.style.opacity = 1;
            volumeBtn.src = "images/volume.png";
        } 
        
    }
    if(e.keyCode === 40) {
        if(video.volume >= 0.1) {
            video.volume = video.volume - 0.1;
            volume.value = video.volume * 100;
            volumeBtn.style.opacity = 1;
            volumeBtn.src = "images/volume.png";
        }
        else {
            video.volume = 0;
            volume.value = 0;
            volumeBtn.style.opacity = 0.5;
            volumeBtn.src = "images/muted.png";
        } 
    }
}

window.addEventListener("keydown", changeVolumeOnKeyboard);

// show settings menu for changing video speed
function showSpeedMenu() {
    if (speedMenu.style.display == "none") {
        speedMenu.style.display = "flex";
    }
    else {
        speedMenu.style.display = "none";
    }
}

settings.addEventListener("click", showSpeedMenu);

// hide speed menu when click outside of settings
window.onclick = function(e) {

    if(e.target !== settings) {
        speedMenu.style.display = "none";
    }
}

// set current time of video and video duration time
function timeOfVideo() {
    let currentMinutes = Math.floor(video.currentTime/60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes*60);
    let durationMinutes = Math.floor(video.duration/60);
    let durationSeconds = Math.floor(video.duration - durationMinutes*60);

    if (currentSeconds < 10) {
        current.innerHTML = currentMinutes + ":" + "0" + currentSeconds;
    }
    else current.innerHTML = currentMinutes + ":" + currentSeconds;

    if (durationSeconds < 10) {
        duration.innerHTML = durationMinutes + ":" + "0" + durationSeconds;
    }
    else duration.innerHTML = durationMinutes + ":" + durationSeconds;
}
video.addEventListener("timeupdate", timeOfVideo);

});