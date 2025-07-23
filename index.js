const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("Reset");
const timer = document.getElementById("timer")

let timeLeft = 1500;
let interval;

const lofiSound = new Audio('./mixkit-sleepy-cat-135.mp3');
const alertSound = new Audio('./mixkit-alert-alarm-1005.wav');

lofiSound.loop = true;
lofiSound.volume = 0.3;


const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML =`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
};

const startTimer = () => {

    clearInterval(interval);
    lofiSound.play().catch(e => console.log('Could not play:',e));
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft === 0){
            clearInterval(interval);

            lofiSound.pause();
            lofiSound.currentTime = 0;

            alertSound.play().catch(e => console.log('Could not play:',e));

            alert("Time Up!!!")
            timeLeft = 1500;
            updateTimer();
        }

    },1000);
}

const stopTimer = () => {
    clearInterval(interval);

    lofiSound.pause();
    };

const resetTimer = () => {
    clearInterval(interval);
    lofiSound.pause();
    lofiSound.currentTime = 0;
    timeLeft = 1500;
    updateTimer();
}

updateTimer();

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);