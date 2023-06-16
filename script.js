const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

const togglePlay = () => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateToggle() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function slide() {
    video[this.name] = this.value;
}

function handleProgress() {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e) {
    const scrub = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrub;
}

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateToggle);
video.addEventListener('play', updateToggle);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', slide));
ranges.forEach(range => range.addEventListener('mousemove', slide));
progress.addEventListener('click', scrub);


document.addEventListener('keydown', function(e) {
    if(e.code === "Space") {
        e.preventDefault();
        togglePlay();
    }
});