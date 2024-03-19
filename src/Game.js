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
    const [pressedNum, setPressedNum] = useState('');
    const [millisec, setMillisec] = useState(1000);
    const [level, setLevel] = useState(1);
    const [keyTimer, setKeyTimer] = useState(null);

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

    const getNum = (num) => {
        console.log("number:", num); // Log the resulting letter

        clearTimeout(keyTimer);
        setPressedNum(prevNum => prevNum + num);
        setKeyTimer(setTimeout(() => {
            numToLetter(); // Call numToLetter after the timeout
        }, millisec));
    };
    

    const getLevel = (operator) => {
        switch (operator) {
            case '+':
                setLevel((prevLevel) => Math.min(prevLevel + 1, 5));
                break;
            case '-':
                setLevel((prevLevel) => Math.max(prevLevel - 1, 1));
                break;
            default:
                break;
        }
        setMillisec(level * 1000);
    };

    const numToLetter = () => {

        let letter = '';
        
        switch (pressedNum) {
            case '1':
                letter = 'Q';
                break;
            case '11':
                letter = 'W';
                break;
            case '111':
                letter = 'E';
                break;
            case '2':
                letter = 'R';
                break;
            case '22':
                letter = 'T';
                break;
            case '222':
                letter = 'Y';
                break;
            case '3':
                letter = 'U';
                break;
            case '33':
                letter = 'I';
                break;
            case '333':
                letter = 'O';
                break;
            case '4':
                letter = 'P';
                break;
            case '44':
                letter = 'A';
                break;
            case '444':
                letter = 'S';
                break;
            case '5':
                letter = 'D';
                break;
            case '55':
                letter = 'F';
                break;
            case '555':
                letter = 'G';
                break;
            case '6':
                letter = 'H';
                break;
            case '66':
                letter = 'J';
                break;
            case '666':
                letter = 'K';
                break;
            case '7':
                letter = 'L';
                break;
            case '77':
                letter = 'Ñ';
                break;
            case '777':
                letter = 'Z';
                break;
            case '8':
                letter = 'X';
                break;
            case '88':
                letter = 'C';
                break;
            case '888':
                letter = 'V';
                break;
            case '9':
                letter = 'B';
                break;
            case '99':
                letter = 'N';
                break;
            case '999':
                letter = 'M';
                break;
            default:
                break;
        }

        console.log("Resulting letter:", letter); // Log the resulting letter
        handleGuess(letter);
        setPressedNum('');
    };

    return (
        <div>
            <h1>Hangman Game</h1>
            <button onClick={handleStartGame} autoFocus>
                Start Game
            </button>
            <p>
                Phrase:{' '}
                {hiddenPhrase
                    .split('')
                    .map((char, index) => {
                        if (char === '|') {
                            return ' ';
                        } else {
                            return char;
                        }
                    })
                    .join('')}{' '}
                - {splitPhrase(phrase).author}
            </p>
            <p>Lives: {lives}</p>
            <p>Last Letter: {lastLetter}</p>
            {gameOver && <p>Game Over!</p>}
            {gameWon && <p>Premio!</p>}
            <div>

                <div className="charKeyboard">
                    <button className="button" onClick={() => handleGuess('Q')}><span id="keyMap">1</span>
                        Q
                    </button>
                    <button className="button" onClick={() => handleGuess('Q')}><span id="keyMap">11</span>
                        W
                    </button>
                    <button className="button" onClick={() => handleGuess('E')}><span id="keyMap">111</span>
                        E
                    </button>
                    <button className="button" onClick={() => handleGuess('R')}><span id="keyMap">2</span>
                        R
                    </button>
                    <button className="button" onClick={() => handleGuess('T')}><span id="keyMap">22</span>
                        T
                    </button>
                    <button className="button" onClick={() => handleGuess('Y')}><span id="keyMap">222</span>
                        Y
                    </button>
                    <button className="button" onClick={() => handleGuess('U')}><span id="keyMap">3</span>
                        U
                    </button>
                    <button className="button" onClick={() => handleGuess('I')}><span id="keyMap">33</span>
                        I
                    </button>
                    <button className="button" onClick={() => handleGuess('O')}><span id="keyMap">333</span>
                        O
                    </button>
                    <button className="button" onClick={() => handleGuess('P')}><span id="keyMap">4</span>
                        P
                    </button>
                    <br />
                    <button className="button" onClick={() => handleGuess('A')}><span id="keyMap">44</span>
                        A
                    </button>
                    <button className="button" onClick={() => handleGuess('S')}><span id="keyMap">444</span>
                        S
                    </button>
                    <button className="button" onClick={() => handleGuess('D')}><span id="keyMap">5</span>
                        D
                    </button>
                    <button className="button" onClick={() => handleGuess('F')}><span id="keyMap">55</span>
                        F
                    </button>
                    <button className="button" onClick={() => handleGuess('G')}><span id="keyMap">555</span>
                        G
                    </button>
                    <button className="button" onClick={() => handleGuess('H')}><span id="keyMap">6</span>
                        H
                    </button>
                    <button className="button" onClick={() => handleGuess('J')}><span id="keyMap">66</span>
                        J
                    </button>
                    <button className="button" onClick={() => handleGuess('K')}><span id="keyMap">666</span>
                        K
                    </button>
                    <button className="button" onClick={() => handleGuess('L')}><span id="keyMap">7</span>
                        L
                    </button>
                    <button className="button" onClick={() => handleGuess('Ñ')}><span id="keyMap">77</span>
                        Ñ
                    </button>
                    <br />
                    <button className="button" onClick={() => handleGuess('Z')}><span id="keyMap">777</span>
                        Z
                    </button>
                    <button className="button" onClick={() => handleGuess('X')}><span id="keyMap">8</span>
                        X
                    </button>
                    <button className="button" onClick={() => handleGuess('C')}><span id="keyMap">88</span>
                        C
                    </button>
                    <button className="button" onClick={() => handleGuess('V')}><span id="keyMap">888</span>
                        V
                    </button>
                    <button className="button" onClick={() => handleGuess('B')}><span id="keyMap">9</span>
                        B
                    </button>
                    <button className="button" onClick={() => handleGuess('N')}><span id="keyMap">99</span>
                        N
                    </button>
                    <button className="button" onClick={() => handleGuess('M')}><span id="keyMap">999</span>
                        M
                    </button>
                    <br />
                </div>
                <div className="numKeyboard">

                    <div class="br">
                        <p id="leyenda"> CAPTURA en seg</p>
                    </div>
                    <div>
                        <button className="button" onClick={() => getLevel('+')}>+</button>
                        <div className="levelAcces"> {level}</div>
                        <button className="button" onClick={() => getLevel('-')}>-</button>
                    </div>

                    <button className="button" onClick={() => getNum('1')}>
                        1
                    </button>
                    <button className="button" onClick={() => getNum('2')}>
                        2
                    </button>
                    <button className="button" onClick={() => getNum('3')}>
                        3
                    </button>
                    <br />
                    <button className="button" onClick={() => getNum('4')}>
                        4
                    </button>
                    <button className="button" onClick={() => getNum('5')}>
                        5
                    </button>
                    <button className="button" onClick={() => getNum('6')}>
                        6
                    </button>
                    <br />
                    <button className="button" onClick={() => getNum('7')}>
                        7
                    </button>
                    <button className="button" onClick={() => getNum('8')}>
                        8
                    </button>
                    <button className="button" onClick={() => getNum('9')}>
                        9
                    </button>
                    <br />
                    <button className="button" onClick={() => getNum('#')}>
                        #
                    </button>
                    <button className="button" onClick={() => getNum('0')}>
                        0
                    </button>
                    <button className="button" onClick={() => getNum('*')}>
                        *
                    </button>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default HangmanGame;
