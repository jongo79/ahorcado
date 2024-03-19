const handleGetNum = (number) => {
    const letter = keyMap[number];
    if (letter) {
        if (!(gameOver || gameWon || usedLetters.has(letter.toLowerCase()))) {
            const { mainPhrase } = splitPhrase(phrase);
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
        }
    }
};
