// Global variables
let secondsRemaining = 30;
let score = 0;
let timerInterval;
let imageInterval;

// Function to increment the score
function incrementScore() {
  score++;
  $('#score').text(score + ' pts');
}

// Function to update the timer display
function updateTimerDisplay() {
  $('#timea').text(secondsRemaining + ' seconds left');
}

// Function to start the game
function startGame() {
  updateTimerDisplay(); // Display the initial timer value (30 seconds)
  startImageInterval();
  timerInterval = setInterval(function () {
    decrementTimer();
  }, 1000);

  // Turn off click on the start button once the game has started
  $('#start_button').off('click');

 
}

// Function to decrement the timer
function decrementTimer() {
  secondsRemaining--;

  if (secondsRemaining >= 0) {
    updateTimerDisplay();
  } else {
    endGame(); // Call the function to end the game when the timer reaches 0
  }
}

// Function to end the game
function endGame() {
  // Stop the timer and image intervals
  clearInterval(timerInterval);
  clearInterval(imageInterval);

  // Disable click on the game images
  $('#gamespace').off('click', '.game-image');

  // Display the final score in an alert or jQueryUI dialog
  alert('Game Over! Your Score: ' + score);

  // Reset the game to its initial state
  resetGame();
}

// Function to reset the game
function resetGame() {
  // Reset global variables
  secondsRemaining = 30;
  score = 0;

  // Reset UI elements
  $('#score').text('0 pts');
  $('#timea').text('30 seconds left');

  // Enable click on the start button
  $('#start_button').on('click', function () {
    startGame();
  });

  // Reattach click event for clickable images
  $('#gamespace').on('click', '.game-image', function () {
    $(this).remove();
    incrementScore();
  });
}

// Function to add an image dynamically to gamespace
function addImage() {
  // Get the width and height of the gamespace
  const gamespaceWidth = $('#gamespace').width();
  const gamespaceHeight = $('#gamespace').height();

  // Get the width and height of the image
  const imageWidth = 50;
  const imageHeight = 50;

  // Randomly position the image within the gamespace
  const xPos = getRandomNumber(gamespaceWidth - imageWidth);
  const yPos = getRandomNumber(gamespaceHeight - imageHeight);

  // Append the image to gamespace with inline style
  $('#gamespace').append(`<img src="img/fish6.png" alt="Game Image" class="game-image" style="position: absolute; left: ${xPos}px; top: ${yPos}px; width: ${imageWidth}px; height: ${imageHeight}px;">`);

  // Set a random time for the image to disappear
  const imageTimeout = getRandomNumber(5000); 
  setTimeout(function () {
    $('.game-image:last-child').remove();
  }, imageTimeout);
}

// Click event listener for clickable images
$('#gamespace').on('click', '.game-image', function () {
  // Make the image disappear when clicked
  $(this).remove();
  incrementScore();
});

// Function to repeat the addImage function on a timed interval
function startImageInterval() {
  // Randomize the time interval between 0 and 2000 milliseconds
  const intervalTime = getRandomNumber(2001);
  imageInterval = setInterval(addImage, intervalTime);
}

// Function to get a random number up to a specified max value
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// jQuery ready function
$(document).ready(function () {
  // Click event listener for the start button
  $('#start_button').click(function () {
    startGame();
  });

  // Stylize the start button
  $('#start_button').css({
    width: '150px',
    height: '40px',
    fontSize: '18px',
    backgroundColor: '#00f',
    color: '#fff',
  });

  // Show the timer phrase and adjust its styling
  $('#timea').removeClass('hidden').css({
    color: '#ff0000',
    fontSize: '20px',
  });

  // Load content from load.html into the footer
  $('footer').load('load.html');
});
