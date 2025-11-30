// --- Game State Variables ---
let playerScore = 0;
let computerScore = 0;
const winningScore = 5; // First to 5 wins

// --- DOM Element Selection ---
const scorePlayerEl = document.querySelector('.score-player');
const scoreComputerEl = document.querySelector('.score-computer');
const controlsContainer = document.querySelector('.controls-container');
const matchStatusGrid = document.querySelector('.match-status-grid');
const playerChoiceBox = document.querySelector('.choice-box-player');
const cpuChoiceBox = document.querySelector('.choice-box-cpu');
const winnerTextEl = document.createElement('div'); // Create the winner text element dynamically
winnerTextEl.classList.add('winner-text');
winnerTextEl.textContent = 'WINNER!';

// Map of choices to their display emoji (emojis will act as the "icon")
const choiceMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};
// Array of choices for the computer's random selection
const choices = ['rock', 'paper', 'scissors'];


/**
 * Returns a random choice for the computer.
 */
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


/**
 * Determines the winner of the round and updates scores.
 * @param {string} playerMove - The move chosen by the player ('rock', 'paper', 'scissors').
 * @param {string} computerMove - The move chosen by the computer.
 */
function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return 'tie';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        playerScore++;
        return 'player';
    } else {
        computerScore++;
        return 'computer';
    }
}

/**
 * Updates the score display and the round result visuals.
 * @param {string} playerMove - Player's choice.
 * @param {string} computerMove - Computer's choice.
 * @param {string} result - 'player', 'computer', or 'tie'.
 */
function updateUI(playerMove, computerMove, result) {
    // 1. Update Score
    scorePlayerEl.textContent = playerScore;
    scoreComputerEl.textContent = computerScore;

    // 2. Update Choice Icons (Using innerHTML for emojis)
    playerChoiceBox.querySelector('.choice-icon').innerHTML = choiceMap[playerMove];
    cpuChoiceBox.querySelector('.choice-icon').innerHTML = choiceMap[computerMove];

    // 3. Update Result Visuals
    // Clear previous results/glows
    playerChoiceBox.classList.remove('choice-box-winner');
    cpuChoiceBox.classList.remove('choice-box-winner');
    if (playerChoiceBox.contains(winnerTextEl)) {
        playerChoiceBox.removeChild(winnerTextEl);
    }
    if (cpuChoiceBox.contains(winnerTextEl)) {
        cpuChoiceBox.removeChild(winnerTextEl);
    }
    
    // Apply new result styling
    if (result === 'player') {
        playerChoiceBox.classList.add('choice-box-winner');
        playerChoiceBox.prepend(winnerTextEl); // Add WINNER text to player box
    } else if (result === 'computer') {
        cpuChoiceBox.classList.add('choice-box-winner');
        cpuChoiceBox.prepend(winnerTextEl); // Add WINNER text to CPU box
    } else {
        // Optional: Add a subtle animation/text for "TIE"
    }

    // 4. Check for Game Over
    if (playerScore === winningScore || computerScore === winningScore) {
        endGame(playerScore === winningScore ? 'Player' : 'Computer');
    }
}

/**
 * Main function to run a single round of the game.
 * @param {string} playerMove - The choice made by the player.
 */
function playRound(playerMove) {
    if (playerScore === winningScore || computerScore === winningScore) {
        return; // Game is over, ignore clicks
    }

    const computerMove = getComputerChoice();
    const result = determineWinner(playerMove, computerMove);
    
    updateUI(playerMove, computerMove, result);
}

/**
 * Handles the game-over state.
 * @param {string} winner - 'Player' or 'Computer'.
 */
function endGame(winner) {
    // In a real game, you would display a modal or a big banner
    alert(`Game Over! ${winner} wins the match!`);
    
    // Optional: Reset button for a new game
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again';
    resetButton.onclick = resetGame;
    // Append the button to a visible area (e.g., replace controls)
    controlsContainer.innerHTML = '';
    controlsContainer.appendChild(resetButton);
}

/**
 * Resets the game state.
 */
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateUI('rock', 'rock', 'tie'); // Reset visual state to a neutral 'rock vs rock' tie
    
    // Re-create the buttons (or re-attach listeners if they were just hidden)
    location.reload(); // Quickest way to reset the complex UI state
}


// --- Event Listener Setup ---
controlsContainer.addEventListener('click', (event) => {
    // Check if the clicked element or its parent is a button with the class 'rps-button'
    const button = event.target.closest('.rps-button');

    if (button) {
        // Get the choice from the data-choice attribute we added in the HTML
        const playerMove = button.dataset.choice;
        playRound(playerMove);
    }
});

// Initial load: Set the scores to zero and display a neutral start state
window.onload = () => {
    // We add an initial neutral state to the choice boxes
    updateUI('rock', 'rock', 'tie');
    // NOTE: You will need to add the CSS class .choice-box-winner with the neon-green glow 
    // to your stylesheet for the winner visual to work correctly.
};