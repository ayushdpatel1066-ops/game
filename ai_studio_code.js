const tg = window.Telegram.WebApp;

// Expand to full screen
tg.expand();

// Initialize variables
let score = Number(localStorage.getItem('score')) || 0;
let energy = 100;
const coin = document.getElementById('coin');
const scoreEl = document.getElementById('score');
const energyEl = document.getElementById('energy');
const energyFill = document.getElementById('energy-fill');
const userInfo = document.getElementById('user-info');

// Update UI on load
scoreEl.textContent = score;
if (tg.initDataUnsafe.user) {
    userInfo.textContent = `Player: ${tg.initDataUnsafe.user.first_name}`;
} else {
    userInfo.textContent = "Player: Anon";
}

// Handle Tap
coin.addEventListener('click', (e) => {
    if (energy > 0) {
        // Increment Score
        score++;
        scoreEl.textContent = score;
        localStorage.setItem('score', score); // Save progress

        // Decrease Energy
        energy--;
        updateEnergy();

        // Show floating +1 animation
        showFloatText(e.clientX, e.clientY);
        
        // Vibration feedback (Haptic)
        tg.HapticFeedback.impactOccurred('medium');
    }
});

function updateEnergy() {
    energyEl.textContent = energy;
    energyFill.style.width = `${energy}%`;
}

function showFloatText(x, y) {
    const float = document.createElement('div');
    float.classList.add('float-text');
    float.textContent = '+1';
    float.style.left = `${x}px`;
    float.style.top = `${y}px`;
    document.body.appendChild(float);

    setTimeout(() => {
        float.remove();
    }, 1000);
}

// Regenerate Energy
setInterval(() => {
    if (energy < 100) {
        energy++;
        updateEnergy();
    }
}, 1000);