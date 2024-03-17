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
                }
                return char;
            }).join('');
        });

        // Check if the guessed letter is correct and update the hiddenSentence state
        setHiddenSentence(prevHiddenSentence => {
            return combinedSentence.split('').map((char, index) => {
                if (char.toUpperCase() === KEY) {
                    return char;
                }
                if (char !== ' ' && char !== ',' && char !== '.') {
                    return '_';
                }
                return char;
            }).join('');
        });

        // Check if the guessed letter is incorrect and update the errorCounter state
        if (combinedSentence.toUpperCase().indexOf(KEY) === -1) {
            setErrorCounter(prevErrorCounter => prevErrorCounter + 1);
            // Check if the maximum number of errors is reached
            if (errorCounter >= 7) {
                setGameOver(true);
                setGameOver2(true);
            }
        }
    };

    const printSentence = () => {
        // Combine the hiddenFirstPart with the author part and update the combinedSentence state
        setCombinedSentence(`${hiddenFirstPart} - ${author}`);
        // Update the hiddenSentence state to hide the author part
        setHiddenSentence(hiddenFirstPart.split('').map(char => {
            if (char !== ' ' && char !== ',' && char !== '.') {
                return '_';
            }
            return char;
        }).join(''));
    };

    const addAccent = (letter) => {
        // Add the accent character for certain letters
        switch (letter.toUpperCase()) {
            case 'A':
                return 'Á';
            case 'E':
                return 'É';
            case 'I':
                return 'Í';
            case 'O':
                return 'Ó';
            case 'U':
                return 'Ú';
            default:
                return letter;
        }
    };

    const handleKeyDown = (event) => {
        // Handle key presses and call the corresponding function
        const key = event.key;
        if (key.match(/[0-9]/)) {
            handleGetNum(key);
        } else if (key.toUpperCase().match(/[A-ZÁÉÍÓÚÑ]/)) {
            getKey(key);
        }
    };

    useEffect(() => {
        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyDown);
        // Remove event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Only add/remove event listener on mount/unmount

    return (
        <div className="App">
            <h1>Ahorcado</h1>
            <div className="ahorcado">
                {gameOver2 && <img src={ahorcado4} alt="game over" />}
                {errorCounter === 0 && <img src={ahorcado1} alt="ahorcado" />}
                {errorCounter === 1 && <img src={ahorcado2} alt="ahorcado" />}
                {errorCounter === 2 && <img src={ahorcado3} alt="ahorcado" />}
                {errorCounter === 3 && <img src={ahorcado4} alt="ahorcado" />}
            </div>

            <DragKeyboard
                level={level}
                handleGetLevel={handleGetLevel}
                handleGetNum={handleGetNum}
                getKey={getKey}
            />

            <div className="inputContainer">
                <input
                    type="text"
                    className="inputSentence"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Escribe aquí la frase"
                />
                <button className="button" onClick={() => handleGetRandomSentence()}>
                    Cambiar frase
                </button>
            </div>

            <p className="author">{author}</p>

            <p className="hiddenSentence">{hiddenSentence}</p>
            {gameOver && <p className="gameOver">¡Perdiste!</p>}
        </div>
    );
};

export default Game;
