import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const HangmanGame = () => {
    const phrases = [
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
    ];

    const [phrase, setPhrase] = useState('');
    const [lives, setLives] = useState(12);
    const [usedLetters, setUsedLetters] = useState(new Set());
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [hiddenPhrase, setHiddenPhrase] = useState('');
    const [lastLetter, setLastLetter] = useState('');

    const generateRandomPhrase = () => phrases[Math.floor(Math.random() * phrases.length)];

    const generateHiddenPhrase = (phrase) => {
        const { mainPhrase } = splitPhrase(phrase);
        const normalizedPhrase = _.deburr(mainPhrase);
        return normalizedPhrase
            .replace(/\S/g, '_') // Replace letters with underscores
            .replace(/ /g, '|') // Replace spaces with pipes
            .replace(/,/g, ', '); // Replace commas with commas followed by a space
    };

    const splitPhrase = (phrase) => {
        const parts = phrase.split(' - ');
        return {
            mainPhrase: parts[0],
            author: parts[1]
        };
    };

    const handleStartGame = () => {
        const randomPhrase = generateRandomPhrase();
        setPhrase(randomPhrase.toUpperCase());
        setHiddenPhrase(generateHiddenPhrase(randomPhrase.toUpperCase()));
        setLives(12);
        setUsedLetters(new Set());
        setGameOver(false);
        setGameWon(false);
    };

    const handleGuess = (letter) => {
        if (gameOver || gameWon || usedLetters.has(letter.toLowerCase())) return;

        const { mainPhrase, author } = splitPhrase(phrase);
        const normalizedMainPhrase = _.deburr(mainPhrase);
        let letterGuessed = false;
        const newHiddenPhrase = normalizedMainPhrase.split('').map((char, index) => {
            if (char.toLowerCase() === letter.toLowerCase()) {
                letterGuessed = true;
                return phrase[index];
            } else {
                return hiddenPhrase[index];
            }
        }).join('');

        setHiddenPhrase(newHiddenPhrase);

        if (!newHiddenPhrase.includes('_')) {
            setGameWon(true);
        } else if (!letterGuessed) {
            setLives(lives - 1);
            if (lives === 1) {
                setGameOver(true);
            }
        }

        setUsedLetters(new Set([...usedLetters, letter.toLowerCase()]));
        setLastLetter(letter);
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            const letter = event.key.toUpperCase();
            if (/^[A-Z]$/.test(letter)) {
                handleGuess(letter);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleGuess]);
    

    return (
        <div>
            <h1>Hangman Game</h1>
            <button onClick={handleStartGame} autoFocus>Start Game</button>
            <p>Phrase: {hiddenPhrase.split('').map((char, index) => {
                if (char === '|') {
                    return ' ';
                } else {
                    return char;
                }
            }).join('')} - {splitPhrase(phrase).author}</p>
            <p>Lives: {lives}</p>
            <p>Last Letter: {lastLetter}</p>
            {gameOver && <p>Game Over!</p>}
            {gameWon && <p>Premio!</p>}
            <div>

        <div>

        <div className="charKeyboard">
       
        <button className="button" onClick={() => handleGuess('Q')}>Q</button>
        <button className="button" onClick={() => handleGuess('E')}>E</button>
        <button className="button" onClick={() => handleGuess('R')}>R</button>
        <button className="button" onClick={() => handleGuess('T')}>T</button>
        <button className="button" onClick={() => handleGuess('Y')}>Y</button>
        <button className="button" onClick={() => handleGuess('U')}>U</button>
        <button className="button" onClick={() => handleGuess('I')}>I</button>
        <button className="button" onClick={() => handleGuess('O')}>O</button>
        <button className="button" onClick={() => handleGuess('P')}>P</button>
        <br />
        <button className="button" onClick={() => handleGuess('A')}>A</button>
        <button className="button" onClick={() => handleGuess('S')}>S</button>
        <button className="button" onClick={() => handleGuess('D')}>D</button>
        <button className="button" onClick={() => handleGuess('F')}>F</button>
        <button className="button" onClick={() => handleGuess('G')}>G</button>
        <button className="button" onClick={() => handleGuess('H')}>H</button>
        <button className="button" onClick={() => handleGuess('J')}>J</button>
        <button className="button" onClick={() => handleGuess('K')}>K</button>
        <button className="button" onClick={() => handleGuess('L')}>L</button>
        <button className="button" onClick={() => handleGuess('Ñ')}>Ñ</button>
        <br />
        <button className="button" onClick={() => handleGuess('Z')}>A</button>
        <button className="button" onClick={() => handleGuess('X')}>S</button>
        <button className="button" onClick={() => handleGuess('C')}>D</button>
        <button className="button" onClick={() => handleGuess('V')}>F</button>
        <button className="button" onClick={() => handleGuess('B')}>G</button>
        <button className="button" onClick={() => handleGuess('N')}>H</button>
        <button className="button" onClick={() => handleGuess('M')}>J</button>
        <br />
        </div>
        <div className="numKeyboard">

        <button className="button" onClick={() => handleGuess('1')}>1</button>
        <button className="button" onClick={() => handleGuess('2')}>2</button>
        <button className="button" onClick={() => handleGuess('3')}>3</button>       
        <br />
        <button className="button" onClick={() => handleGuess('4')}>4</button>
        <button className="button" onClick={() => handleGuess('5')}>5</button>
        <button className="button" onClick={() => handleGuess('6')}>6</button>       
        <br />
        <button className="button" onClick={() => handleGuess('7')}>7</button>
        <button className="button" onClick={() => handleGuess('8')}>8</button>
        <button className="button" onClick={() => handleGuess('9')}>9</button>       
        <br />
        <button className="button" onClick={() => handleGuess('#')}>4</button>
        <button className="button" onClick={() => handleGuess('0')}>5</button>
        <button className="button" onClick={() => handleGuess('*')}>6</button>       
        <br />
        </div>       
      </div>
    </div>
        </div>
    );
};

export default HangmanGame;
