let workSeconds = 0;
let restSeconds = 0;
let isWorking = true; // Track if the user is working or resting
let interval;

const startButton = document.getElementById('startWorkTimer');
const workTimerDisplay = document.getElementById('workTimer');
const restTimerDisplay = document.getElementById('restTimer');

startButton.addEventListener('click', function() {
    if (isWorking) {
        // Start or resume working
        clearInterval(interval); // Clear any existing interval
        interval = setInterval(function() {
            workSeconds++;
            // For every 3 seconds of work, add 1 second to restSeconds
            if (workSeconds % 3 === 0) {
                restSeconds++;
            }
            updateDisplays();
        }, 1000);
        this.textContent = "Start to Rest";
    } else {
        // Start resting
        clearInterval(interval); // Stop working timer
        interval = setInterval(function() {
            if (restSeconds > 0) {
                restSeconds--;
                updateDisplays();
            } else {
                // Rest time is over
                clearInterval(interval);
                alert('Rest time is over. Time to get back to work!');
                this.textContent = "Start to Work"; // Reset button text
                // Reset timers and states as needed for next cycle
            }
        }.bind(this), 1000);
        this.textContent = "Resume to Work";
    }
    isWorking = !isWorking; // Toggle working/resting state
});

function updateDisplays() {
    workTimerDisplay.textContent = `Work Time: ${formatTime(workSeconds)}`;
    restTimerDisplay.textContent = `Rest Time: ${formatTime(restSeconds)}`;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
}

updateDisplays(); // Initial display update
