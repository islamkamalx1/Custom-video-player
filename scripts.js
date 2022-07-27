// Get Our Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build Out Functions
function togglePlay() {
    console.log(video.paused);
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? "►" : "| |";
    toggle.textContent = icon;
}

function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
// Hook up the event listeners

video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",handleProgress);
toggle.addEventListener("click",togglePlay);
skipButtons.forEach(button => button.addEventListener("click",skip));
ranges.forEach(range => range.addEventListener("change",handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove",handleRangeUpdate));
progress.addEventListener("click",scrub);
let mouseDown = false;
progress.addEventListener("musemove",(e) => mouseDown && scrub(e));
progress.addEventListener("mousedown",() => mouseDown = true);
progress.addEventListener("mouseup",() => mouseDown = false);