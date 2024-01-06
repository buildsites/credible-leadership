const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.5; // Adjust the volume as needed (0.0 to 1.0)

// Simulate a delay (you can replace this with actual loading logic)
    setTimeout(function() {
      // Hide the loader overlay after the delay
      document.getElementById('loader-overlay').style.display = 'none';
    }, 3000); // Adjust the duration as needed (e.g., 2000 milliseconds for 2 seconds)

    const gameBoard = document.getElementById("game-board");
    const gridSize = 18;
    const snakeSize = 20;

    let snake = [{ x: 0, y: 0 }];
    let direction = "right";
    let food = generateFood();
    let score = 0;

    function draw() {
      gameBoard.innerHTML = "";

      // Draw snake
      snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.className = "snake";
        snakeElement.style.left = segment.x * gridSize + "px";
        snakeElement.style.top = segment.y * gridSize + "px";
        gameBoard.appendChild(snakeElement);
      });

      // Draw food
      const foodElement = document.createElement("div");
      foodElement.className = "food";
      foodElement.style.left = food.x * gridSize + "px";
      foodElement.style.top = food.y * gridSize + "px";
      gameBoard.appendChild(foodElement);
    }

    function generateFood() {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        };
      } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) || isOutsideGameBoard(newFood));
      return newFood;
    }

    function updateScore() {
      score += 10;
      document.getElementById("score").innerText = score;
    }

    function isOutsideGameBoard(position) {
      return position.x < 0 || position.x >= gridSize || position.y < 0 || position.y >= gridSize;
    }

    function update() {
    const head = { ...snake[0] };

    // Update snake's head position based on direction
    switch (direction) {
      case "up":
        head.y = (head.y - 1 + gridSize) % gridSize;
        break;
      case "down":
        head.y = (head.y + 1) % gridSize;
        break;
      case "left":
        head.x = (head.x - 1 + gridSize) % gridSize;
        break;
      case "right":
        head.x = (head.x + 1) % gridSize;
        break;
    }



      // Check if the head collides with food
      if (head.x === food.x && head.y === food.y) {
        snake.unshift({ ...food });
        food = generateFood();
        updateScore();
      } else {
        // Remove the last segment of the snake
        snake.pop();
      }

  // Check if the head collides with the snake itself
    const collided = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    if (collided) {
        showGameOverOverlay();
        pauseBeforeReset();
        return;
      }

      // Add the updated head to the beginning of the snake
      snake.unshift(head);

      // Draw the updated state
      draw();
    }

// Function to get the highest score from local storage
  function getHighestScore() {
    return localStorage.getItem("highestScore") || 0;
  }

  // Function to set the highest score in local storage
  function setHighestScore(newScore) {
    localStorage.setItem("highestScore", newScore);
  }

  function updateScore() {
    score += 10;
    document.getElementById("score").innerText = score;

    // Check if the current score is higher than the stored highest score
    const currentHighestScore = getHighestScore();
    if (score > currentHighestScore) {
      setHighestScore(score);
    }
  }

   // Display the highest score along with the current score
    document.getElementById("highest-score").innerText = "Highest Score: " + getHighestScore();


function showGameOverOverlay() {
      // Display the overlay with "Game Over" message and user's score
      const overlay = document.getElementById("overlay");
      const overlayContent = document.getElementById("overlay-content");
      // Fetch the highest score again
    const currentHighestScore = getHighestScore();

      overlayContent.innerHTML = "Game Over! <br> Your score is: " + score + "<br> Highest score: " + currentHighestScore;
      overlay.style.display = "flex";

      // Pause for 3 seconds before resetting the game
      setTimeout(() => {
        overlay.style.display = 'none';
    }, 2000); // Display for 3 seconds (adjust as needed)

  } 

    function resetGame() {
       score = 0; // Reset the score to zero  document.getElementById("score").innerText = "0";
      snake = [{ x: 0, y: 0 }];
      direction = "right";
      food = generateFood();
      draw();
      score = 0;
    }

    function changeDirection(newDirection) {
      direction = newDirection;
    }

    function pauseBeforeReset() {


    setTimeout(resetGame, 1000); // Pause for 5 second (5000 milliseconds) before resetting

}



    // Set up the game loop
    setInterval(update, 200);
