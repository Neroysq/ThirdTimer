let totalWorkSeconds = 0; // Total accumulated work time
let continuousWorkSeconds = 0; // Time in the current continuous work session
let restSeconds = 0;
let isWorking = false; // Initially not working
let interval;

const startButton = document.getElementById('startWorkTimer');
const workTimerDisplay = document.getElementById('workTimer');
const restTimerDisplay = document.getElementById('restTimer');
const workTimeText = document.getElementById('workTimeText');
const restTimeText = document.getElementById('restTimeText');

const maxContinuousWorkTime = 5400; // 90 minutes in seconds for continuous work
const maxRestTime = 5400; 

startButton.addEventListener('click', function() {
    if (!isWorking) {
        // Start or resume working
        isWorking = true;
        startButton.textContent = "Stop Working & Start Rest";
        clearInterval(interval);
        interval = setInterval(workTimer, 1000);
    } else {
        // Manually start resting
        startResting();
    }
});

function workTimer() {
    totalWorkSeconds++;
    continuousWorkSeconds++;
    // Calculate rest time based on continuous work time, not exceeding maxRestTime
    if (continuousWorkSeconds <= maxContinuousWorkTime && continuousWorkSeconds % 3 == 0) {
        restSeconds = Math.min(restSeconds + 1, maxRestTime);
    }

    updateDisplays();

    // Alert the user if they have been working continuously for more than 90 minutes
    if (continuousWorkSeconds == maxContinuousWorkTime) {
        alert('You have been working continuously for more than 90 minutes. Please consider taking a rest.');
    }
}

function startResting() {
    isWorking = false; // Change to resting state
    clearInterval(interval); // Clear any running interval for work timer
    continuousWorkSeconds = 0; // Reset continuous work time since a rest is initiated
    startButton.textContent = "Resume Working"; // Change button text for resuming work
    interval = setInterval(restTimer, 1000); // Start the rest timer countdown
}

function restTimer() {
    if (restSeconds > 0) {
        restSeconds--;
        updateDisplays();
    } else {
        clearInterval(interval);
        alert('Rest time is over. Feel free to resume working.');
        startButton.textContent = "Start to Work"; // Change text back for starting work
    }
}

function updateDisplays() {
    totalWorkTimeText.textContent = `${formatTime(totalWorkSeconds)}`;
    currentWorkTimeText.textContent = `${formatTime(continuousWorkSeconds)}`;
    restTimeText.textContent = `${formatTime(restSeconds)}`;
    workTimerDisplay.style.width = `${(continuousWorkSeconds / maxContinuousWorkTime) * 100}%`; // Reflect total work time in progress bar
    restTimerDisplay.style.width = `${(restSeconds / maxRestTime) * 100}%`; // Reflect rest time in progress bar
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs].map(v => v < 10 ? "0" + v : v).join(":");
}

updateDisplays(); // Initialize the display of timers
