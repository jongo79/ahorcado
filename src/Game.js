import React, { useState, useEffect } from 'react';
import DragKeyboard from './dragKeyboard';


import ahorcado1 from './images/ahorcado1.jpg';
import ahorcado2 from './images/ahorcado2.jpg';
import ahorcado3 from './images/ahorcado3.jpg';
import ahorcado4 from './images/ahorcado4.jpg';
// Import other images as needed


const Game = () => {
    const [keyTimer, setKeyTimer] = useState(null);
    const [firstPart, setFirstPart] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [gameOver2, setGameOver2] = useState(false);
    const [combinedSentence, setCombinedSentence] = useState('');
    const [intervalId, setIntervalId] = useState(null); // If it needs to be a state variable
    const [pressedNum, setPressedNum] = useState('');
    const [millisec, setMillisec] = useState(1000);
    const [level, setLevel] = useState(1);
    const [hiddenFirstPart, setHiddenFirstPart] = useState('');
    const [errorCounter, setErrorCounter] = useState(0);
    const [life, setLife] = useState(2);
    const [author, setAuthor] = useState('');
    const [hiddenSentence, setHiddenSentence] = useState([]);
    const [inputValue, setInputValue] = useState('');


    const [sentences, setSentences] = useState([
        "NO HAY QUE IR PARA ATRÁS NI PARA DARSE IMPULSO - LAO TSÉ",
        "NO HAY CAMINOS PARA LA PAZ, LA PAZ ES EL CAMINO - MAHATMA GANDHI",
        "HAZ EL AMOR Y NO LA GUERRA - JOHN LENNON",
        "UN DÍA SIN REÍR ES UN DÍA PERDIDO - CHARLES CHAPLIN",
        "CADA DÍA SABEMOS MÁS Y ENTENDEMOS MENOS - ALBERT EINSTEIN",
        "LO QUE NO TE MATA, TE HACE MÁS FUERTE - FRIEDRICH NIETZSCHE",
        "LE HARÉ UNA OFERTA QUE NO PODRÁ RECHAZAR - VITO CORLEONE",
        "DEJA DE PENSAR EN LA VIDA Y RESUÉLVETE A VIVIRLA - PAULO COELHO",
        "NO HAY NOCHE, POR LARGA QUE SEA, QUE NO ENCUENTRE EL DÍA - W. SHAKESPEARE",
        "LADRAN, SANCHO, SEÑAL QUE CABALGAMOS - MIGUEL DE CERVANTES",
    ]);

    useEffect(() => {
        // Load initial sentence when component mounts
        handleGetRandomSentence();
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    const handleKeyDown = (event) => {
        console.log("Pressed Key:", event.key); // Log the pressed key
        // Check if the pressed key is a number
        if (/^[0-9]$/.test(event.key)) {
            handleGetNum(event.key);
        }
    };
    
    
        
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }; 
    
    const handleGetNum = (num) => {
        clearTimeout(keyTimer);
        setPressedNum(prevNum => prevNum + num);
        setKeyTimer(setTimeout(numToLetter, millisec));
    };

    const handleGetLevel = (operator) => {
        let newLevel = level;
        switch (operator) {
            case "+":
                newLevel = Math.min(newLevel + 1, 5);
                break;
            case "-":
                newLevel = Math.max(newLevel - 1, 1);
                break;
            default:
                break;
        }
        setLevel(newLevel);
        setMillisec(newLevel * 1000);
    };

    const handleGetRandomSentence = () => {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        const sentence = sentences[randomIndex];
        const sentenceParts = sentence.split(' - ');
        if (sentenceParts.length >= 2) {
            // Set the initial hiddenFirstPart to a string of underscores with the same length as the first part of the sentence
            setHiddenFirstPart(sentenceParts[0].replace(/[A-Za-zÁÉÍÓÚÑ]/g, '_'));
            setFirstPart(sentenceParts[0]);
            setAuthor(sentenceParts[1]);
            printSentence(); // Call printSentence after updating the state
        } else {
            console.error('Invalid sentence format: ' + sentence);
        }
    };
    
    
    const numToLetter = () => {
        let letter = '';

        switch (pressedNum) {

            case "1":
                letter = "Q";
                break;
            case '11':
                letter = "W";
                break;
            case '111':
                letter = "E";
                break;
            case '2':
                letter = "R";
                break;
            case '22':
                letter = "T";
                break;
            case '222':
                letter = "Y";
                break;
            case '3':
                letter = "U";
                break;
            case '33':
                letter = "I";
                break;
            case '333':
                letter = "O";
                break;
            case '4':
                letter = "P";
                break;
            case '44':
                letter = "A";
                break;
            case '444':
                letter = "S";
                break;
            case '5':
                letter = "D";
                break;
            case '55':
                letter = "F";
                break;
            case '555':
                letter = "G";
                break;
            case '6':
                letter = "H";
                break;
            case '66':
                letter = "J";
                break;
            case '666':
                letter = "K";
            case '7':
                letter = "L";
                break;
            case '77':
                letter = "Ñ";
                break;
            case '777':
                letter = "Z";
                break;
            case '8':
                letter = "X";
                break;
            case '88':
                letter = "C";
                break;
            case '888':
                letter = "V";
                break;
            case '9':
                letter = "B";
                break;
            case '99':
                letter = "N";
                break;
            case '999':
                letter = "M";
                break;
            default:
        }
        //console.log(pressedNum);
        pressedNum = '';    // Clear the pressedKey for the next input
        getKey(letter);

    };

    const getKey = (letter) => {
        // Update state to set the current letter
        const KEY = letter.toUpperCase();
        // Update state to reflect the current letter
        setPressedNum('');
    
        // Update state to hide characters based on guessed letter
        const guessedLetterWithAccent = addAccent(letter);
        setHiddenFirstPart(prevHiddenFirstPart => {
            return prevHiddenFirstPart.split('').map(char => {
                if (char !== ' ' && char !== letter && char !== guessedLetterWithAccent && char !== ',' && char !== '.') {
                    return '_';
                } else {
                    return char;
                }
            }).join('');
        });
    
        // Combine hidden parts of the sentence
        const combinedSentence = combineSentences(hiddenFirstPart, firstPart);
        // Update state to reflect changes in the hidden sentence
        setHiddenFirstPart(combinedSentence);
    
        // Print the updated sentence
        printSentence();
    
        // Update error counter if needed
        if (combinedSentence === firstPart) {
            // Set interval for image toggling
            setInterval(toggleImages, 50);
        }
        // Manage game over condition
        if (combinedSentence === firstPart || life === 0) {
            // Update state to indicate game over
            setGameOver(true);
            setGameOver2(true);
        }
    };

    
    const hideSentence = (guessedLetter) => {
        const guessedLetterWithAccent = addAccent(guessedLetter);
        
        setHiddenFirstPart(prevHiddenFirstPart => {
            return prevHiddenFirstPart.replace(new RegExp(`[^${guessedLetter}${guessedLetterWithAccent},. ]`, 'g'), '_');
        });
    };

    const combineSentences = (sentence1, sentence2) => {
        let result = "";    // Initialize an empty string for the combined result
        for (let i = 0; i < sentence1.length; i++) {    // Iterate through each character in the sentences

            const char1 = sentence1[i];
            const char2 = sentence2[i];

            if (/^[A-Za-zÁÉÍÓÚÑ]$/.test(char1)) {        // For example, prioritize letters over non-letters

                result += char1;
            } else {
                result += char2;
            }
        }

        return result;
    };

    const addAccent = (letter) => {
        const accentMap = {     // Define a mapping of letters to accented letters
            A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú',     // Add more mappings as needed
        };
        if (accentMap.hasOwnProperty(letter)) {    // Check if the letter has an accent in the mapping
            return accentMap[letter];        // Return the accented letter
        }
    
        // return letter;    // If no accent is found, return the original letter
    };
    
    const printSentence = () => {
        // Get the container element where the hidden sentence will be displayed
        const container = document.getElementById("hiddenSentence");
        
        // Check if the container exists in the DOM before proceeding
        if (container) {
            // Clear the container before displaying the updated sentence
            container.innerHTML = '';
        
            // Retrieve the current hidden sentence
            const sentence = hiddenFirstPart;
        
            // Loop through each character in the hidden sentence
            for (const char of sentence) {
                // Create a <span> element to represent each character
                const spanElement = document.createElement("span");
                // Check if the character is not a space
                if (char !== ' ') {
                    // Add a CSS class for styling
                    spanElement.className = "sentenceLetter";
                } else {
                    // If the character is a space, add a line break
                    spanElement.className = "space";
                    container.appendChild(document.createElement("br"));
                }
                // Set the text content of the <span> element to the character
                spanElement.textContent = char;
                // Append the <span> element to the container
                container.appendChild(spanElement);
            }
        }
    };
    
    
    
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
    

    document.addEventListener('keydown', handleKeyDown);

    return (
        <div className="game-container" onKeyDown={handleKeyDown}>
            <div id="display">
                <div id="squares">
                    <p id="hiddenSentence"></p>
                </div>
                <p className="author" id="author">{author}</p>
            </div> 
            <button className="button" id="idboton" onClick={handleGetRandomSentence}>
                Press to start<span id="keyMap"> ENTER</span>
            </button>
            <div className="display">
    <div className="gameOver">
        <img id="errorImage3" src={require('./images/ahorcadoBlank.jpg')} alt="Error Image" />
    </div>
    <div className="image">
        <img id="errorImage1" src={require('./images/ahorcado0.jpg')} alt="Error Image" />
    </div>
    <div className="letterDisplay">
        <p id="letter"></p>
    </div>
    <div className="image">
        <img id="errorImage2" src={require('./images/ahorcado0.jpg')} alt="Error Image" />
    </div>
    <div className="gameOver">
        <img id="errorImage4" src={require('./images/ahorcadoBlank.jpg')} alt="Error Image" />
    </div>
</div>
<div className="keyboard">
<DragKeyboard 
                level={level} 
                handleGetLevel={handleGetLevel} 
                handleGetNum={handleGetNum} 
                getKey={getKey} 
            />
</div>

            
        </div>
    );
    
    
    
};

export default Game;
