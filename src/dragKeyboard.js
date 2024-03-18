import React, { useState } from 'react';
import Draggable from 'react-draggable'; // Import Draggable from react-draggable

const DragKeyboard = () => {
    const [keyTimer, setKeyTimer] = useState(null);
    const [pressedNum, setPressedNum] = useState('');
    const [millisec, setMillisec] = useState(1000);
    const [level, setLevel] = useState(1);

    const getKey = (letter) => {
        // Update state to set the current letter
        const KEY = letter.toUpperCase();
        // Update state to reflect the current letter
        setPressedNum('');
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

    const handleGetNum = (num) => {
        clearTimeout(keyTimer);
        setPressedNum(prevNum => prevNum + num);
        setKeyTimer(setTimeout(numToLetter, millisec));
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
                break;
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
                break;
        }
        //console.log(pressedNum);
        pressedNum = '';    // Clear the pressedKey for the next input
        getKey(letter);
    };

    return (
        <Draggable>
            <div className="keyboard">
                <div className="numKeyboardSmall" id="draggableElement">
                    <div className="br">
                        <p id="leyenda">CAPTURA en segundos</p>
                    </div>

                    <div className="levelAcces2">
                        <button className="button2" onClick={() => handleGetLevel('+')}>+</button>
                        <span className="levelAcces" id="level">{level}</span>
                        <button className="button2" onClick={() => handleGetLevel('-')}>-</button>
                    </div>

                    <button className="button2" data-real-key="1" onClick={() => handleGetNum('1')}>1</button>
                    <button className="button2" data-real-key="2" onClick={() => handleGetNum('2')}>2</button>
                    <button className="button2" data-real-key="3" onClick={() => handleGetNum('3')}>3</button>
                    <br />
                    <button className="button2" data-real-key="4" onClick={() => handleGetNum('4')}>4</button>
                    <button className="button2" data-real-key="5" onClick={() => handleGetNum('5')}>5</button>
                    <button className="button2" data-real-key="6" onClick={() => handleGetNum('6')}>6</button>
                    <br />
                    <button className="button2" data-real-key="7" onClick={() => handleGetNum('7')}>7</button>
                    <button className="button2" data-real-key="8" onClick={() => handleGetNum('8')}>8</button>
                    <button className="button2" data-real-key="9" onClick={() => handleGetNum('9')}>9</button>
                    <br />
                    <button className="button2" data-real-key="#" onClick={() => handleGetNum('#')}>#</button>
                    <button className="button2" data-real-key="0" onClick={() => handleGetNum('0')}>0</button>
                    <button className="button2" data-real-key="*" onClick={() => handleGetNum('*')}>*</button>
                </div>

                <div className="numkeyboard">
                    <br />
                    <button className="button" data-real-key="q" onClick={() => getKey('q')}>Q<span id="keyMap">1</span></button>
                    <button className="button" data-real-key="w" onClick={() => getKey('w')}>W<span id="keyMap">11</span></button>
                    <button className="button" data-real-key="e" onClick={() => getKey('e')}>E<span id="keyMap">111</span></button>
                    <button className="button" data-real-key="r" onClick={() => getKey('r')}>R<span id="keyMap">2</span></button>
                    <button className="button" data-real-key="t" onClick={() => getKey('t')}>T<span id="keyMap">22</span></button>
                    <button className="button" data-real-key="y" onClick={() => getKey('y')}>Y<span id="keyMap">222</span></button>
                    <button className="button" data-real-key="u" onClick={() => getKey('u')}>U<span id="keyMap">3</span></button>
                    <button className="button" data-real-key="i" onClick={() => getKey('i')}>I<span id="keyMap">33</span></button>
                    <button className="button" data-real-key="o" onClick={() => getKey('o')}>O<span id="keyMap">333</span></button>
                    <button className="button" data-real-key="p" onClick={() => getKey('p')}>P<span id="keyMap">4</span></button>
                    <br />
                    <button className="button" data-real-key="a" onClick={() => getKey('a')}>A<span id="keyMap">44</span></button>
                    <button className="button" data-real-key="s" onClick={() => getKey('s')}>S<span id="keyMap">444</span></button>
                    <button className="button" data-real-key="d" onClick={() => getKey('d')}>D<span id="keyMap">5</span></button>
                    <button className="button" data-real-key="f" onClick={() => getKey('f')}>F<span id="keyMap">55</span></button>
                    <button className="button" data-real-key="g" onClick={() => getKey('g')}>G<span id="keyMap">555</span></button>
                    <button className="button" data-real-key="h" onClick={() => getKey('h')}>H<span id="keyMap">6</span></button>
                    <button className="button" data-real-key="j" onClick={() => getKey('j')}>J<span id="keyMap">66</span></button>
                    <button className="button" data-real-key="k" onClick={() => getKey('k')}>K<span id="keyMap">666</span></button>
                    <button className="button" data-real-key="l" onClick={() => getKey('l')}>L<span id="keyMap">7</span></button>
                    <button className="button" data-real-key="ñ" onClick={() => getKey('ñ')}>Ñ<span id="keyMap">77</span></button>
                    <br />
                    <button className="button" data-real-key="z" onClick={() => getKey('z')}>Z<span id="keyMap">777</span></button>
                    <button className="button" data-real-key="x" onClick={() => getKey('x')}>X<span id="keyMap">8</span></button>
                    <button className="button" data-real-key="c" onClick={() => getKey('c')}>C<span id="keyMap">88</span></button>
                    <button className="button" data-real-key="v" onClick={() => getKey('v')}>V<span id="keyMap">888</span></button>
                    <button className="button" data-real-key="b" onClick={() => getKey('b')}>B<span id="keyMap">9</span></button>
                    <button className="button" data-real-key="n" onClick={() => getKey('n')}>N<span id="keyMap">999</span></button>
                    <br />
                    <div className="br"></div>
                </div>
            </div>
        </Draggable>
    );
};

export default DragKeyboard;
