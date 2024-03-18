import React, { useState } from 'react';
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
        return normalizedPhrase.replace(/\S/g, '_').replace(/ /g, '|');
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

    return (
        <div>
            <h1>Hangman Game</h1>
            <button onClick={handleStartGame}>Start Game</button>
            <p>Phrase: {hiddenPhrase} - {splitPhrase(phrase).author}</p>
            <p>Lives: {lives}</p>
            <p>Last Letter: {lastLetter}</p>
            {gameOver && <p>Game Over!</p>}
            {gameWon && <p>Premio!</p>}
            <div>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                    <button key={letter} onClick={() => handleGuess(letter)} disabled={usedLetters.has(letter.toLowerCase())}>
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HangmanGame;
