 const count = () => {
        // Define the path of the image based on the errorCounter
        const imagePath = `images/ahorcado${errorCounter}.jpg`;
    
        // Update the source of the image element based on the remaining life
        if (life === 2) {
            document.getElementById('errorImage1').src = imagePath;
        }
        if (life === 1) {
            document.getElementById('errorImage2').src = imagePath;
        }
    
        // Check if the errorCounter has reached the limit
        if (errorCounter === 6) {
            // If so, decrement the life counter
            errorCounter = 0;
            life--;
    
            // Check if the combined sentence matches the original sentence
            if (combinedSentence === firstPart) {
                // If the game is won, initiate an interval to toggle images rapidly
                setInterval(toggleImages, 50);
            }
        }
    
        // If life reaches zero, display the game over images
        if (life === 0) {
            document.getElementById('errorImage3').src = 'images/gameover.jpg';
            document.getElementById('errorImage4').src = 'images/gameover.jpg';
        }
    };

    const toggleImages = () => {
        let imageIndex = 1; // Initialize imageIndex
        let gameOvercount = 0; // Initialize gameOvercount
    
        // Set an interval to toggle images rapidly
        const intervalId = setInterval(() => {
            // Define the path of the next image
            const imagePath = `images/youWin${imageIndex}.jpg`;
    
            // Update the source of the game over images to create a toggle effect
            if (gameOver && typeof gameOver === 'object') {
                gameOver.src = imagePath;
            }
            if (gameOver2 && typeof gameOver2 === 'object') {
                gameOver2.src = imagePath;
            }
    
            // Increment the image index for the next iteration
            imageIndex = (imageIndex % 3) + 1;
    
            // Increment the counter for the number of iterations
            gameOvercount++;
    
            // Check if the maximum number of iterations is reached
            if (gameOvercount >= 1000) {
                // If so, stop the interval
                clearInterval(intervalId);
            }
        }, 50); // Adjust the interval time as needed (in milliseconds)
    };
    
