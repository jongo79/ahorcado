import React, { useState, useEffect } from 'react';
import DragKeyboard from './dragKeyboard';


import ahorcado1 from './images/ahorcado1.jpg';
import ahorcado2 from './images/ahorcado2.jpg';
import ahorcado3 from './images/ahorcado3.jpg';
import ahorcado4 from './images/ahorcado4.jpg';
// Import other images as needed


const Game = () => {
    const [firstPart, setFirstPart] = useState('');
    const [combinedSentence, setCombinedSentence] = useState('');
    const [intervalId, setIntervalId] = useState(null); // If it needs to be a state variable
    const [hiddenFirstPart, setHiddenFirstPart] = useState('');
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
    
    const play = (letter) => {
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
        
    const hideSentence = (guessedLetter) => {
        const guessedLetterWithAccent = addAccent(guessedLetter);
        
        setHiddenFirstPart(prevHiddenFirstPart => {
            return prevHiddenFirstPart.replace(new RegExp(`[^${guessedLetter}${guessedLetterWithAccent},. ]`, 'g'), '_');
        });
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
