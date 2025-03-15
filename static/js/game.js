class NiveaGame {
    constructor() {
        // Game elements
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.gameArea = document.getElementById('game-area');
        
        // Game stats elements
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.livesElement = document.getElementById('lives');
        this.finalScoreElement = document.getElementById('final-score');
        
        // Game state
        this.score = 0;
        this.lives = 3;
        this.timeLeft = 60;
        this.gameActive = false;
        this.fallingItems = new Set();  // Changed to Set for better item tracking
        this.timers = {
            game: null,
            spawn: null
        };
        
        // Product types
        this.productTypes = ['jar', 'tube', 'tin'];
        
        // Bind methods
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
        this.spawnItem = this.spawnItem.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleItemMiss = this.handleItemMiss.bind(this);
        
        // Event listeners
        document.getElementById('start-button').addEventListener('click', this.startGame);
        document.getElementById('restart-button').addEventListener('click', this.startGame);
    }

    startGame() {
        // Reset game state
        this.score = 0;
        this.lives = 3;
        this.timeLeft = 60;
        this.gameActive = true;
        this.fallingItems.clear();
        
        // Update UI
        this.scoreElement.textContent = this.score;
        this.livesElement.textContent = this.lives;
        this.timerElement.textContent = this.timeLeft;
        
        // Show game screen
        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        
        // Clear any existing items
        this.gameArea.innerHTML = '';
        
        // Start game timers
        this.timers.game = setInterval(this.updateTimer, 1000);
        this.timers.spawn = setInterval(this.spawnItem, 1000);
    }

    endGame() {
        this.gameActive = false;
        
        // Clear timers
        clearInterval(this.timers.game);
        clearInterval(this.timers.spawn);
        
        // Update and show game over screen
        this.finalScoreElement.textContent = this.score;
        this.gameScreen.classList.add('hidden');
        this.gameOverScreen.classList.remove('hidden');
        
        // Clear remaining items
        this.fallingItems.clear();
        this.gameArea.innerHTML = '';
    }

    spawnItem() {
        if (!this.gameActive) return;
        
        // Create new item
        const item = document.createElement('div');
        item.className = 'falling-item';
        
        // Add random product type
        const randomType = this.productTypes[Math.floor(Math.random() * this.productTypes.length)];
        item.classList.add(randomType);
        
        // Random position
        const gameAreaWidth = this.gameArea.offsetWidth;
        const randomX = Math.random() * (gameAreaWidth - 60);
        
        // Set initial position
        item.style.left = `${randomX}px`;
        item.style.top = '0';
        
        // Add to game area and tracking
        this.gameArea.appendChild(item);
        this.fallingItems.add(item);
        
        // Add click handler
        item.addEventListener('click', () => this.handleItemClick(item));
        
        // Animate falling
        const animation = item.animate([
            { top: '0px' },
            { top: `${this.gameArea.offsetHeight}px` }
        ], {
            duration: 3000,
            easing: 'linear'
        });
        
        // Handle animation end
        animation.onfinish = () => {
            if (this.fallingItems.has(item)) {  // Only count as miss if item wasn't caught
                this.handleItemMiss(item);
            }
        };
    }

    handleItemClick(item) {
        if (!this.gameActive) return;
        
        // Remove item from tracking and DOM
        this.fallingItems.delete(item);
        item.remove();
        
        // Update score
        this.score += 10;
        this.scoreElement.textContent = this.score;
    }

    handleItemMiss(item) {
        if (!this.gameActive) return;
        
        // Remove item from tracking and DOM
        this.fallingItems.delete(item);
        item.remove();
        
        // Update lives
        this.lives--;
        this.livesElement.textContent = this.lives;
        
        // Check game over
        if (this.lives <= 0) {
            this.endGame();
        }
    }

    updateTimer() {
        if (!this.gameActive) return;
        
        this.timeLeft--;
        this.timerElement.textContent = this.timeLeft;
        
        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new NiveaGame();
}); 