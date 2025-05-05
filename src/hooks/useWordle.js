import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // Array of objects with keys and colors
    const [history, setHistory] = useState([]); // Array of strings for the history of guesses
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({}) // {a: 'green', b: 'yellow', c: 'grey'}

    const validateWord = async (word) => {
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            return res.ok; // true if word exists
        } catch (err) {
            console.error('Word validation failed:', err);
            return false;
        }
    };
      
    // Format the guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}, {key: 'b', color: 'green'}]
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'};
        });

        // Find any green letters
        formattedGuess.forEach((letter, index) => {
            if (solutionArray[index] === letter.key) {
                formattedGuess[index].color = 'green';
                solutionArray[index] = null; // Remove the letter from the array to avoid duplicates
            }
        });

        // Find any yellow letters
        formattedGuess.forEach((letter, index) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[index].color = 'yellow';
                solutionArray[solutionArray.indexOf(letter.key)] = null; // Remove the letter from the array to avoid duplicates
            }
        });

        return formattedGuess;
    };

    // Add a new guess to the guesses state
    // Update the isCorrect state if the guess is correct
    // Add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });

        setTurn((prevTurn) => {
            return prevTurn + 1;
        });

        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys};

            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key];

                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green';
                    return;
                }
                if (letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow';
                    return;
                }
                if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey';
                    return;
                }
            });

            return newKeys;
        });

        setCurrentGuess('');
    };

    // Handle keyup event and track current guess
    // If user presses enter, add the new guess
    const handleKeyup = async ({ key }) => { 
        if (key === 'Enter') {
            // Only add guess if turn is less than 5
            if (turn > 5) {
                console.log('You have used all your guesses!');
                return;
            }
            // Do not allow duplicate guesses
            if (history.includes(currentGuess)) {
                console.log('You have already guessed that word!');
                return;
            }
            // Check word is 5 chars long
            if (currentGuess.length !== 5) {
                console.log('Word must be 5 characters long!');
                return;
            }
            // Word validation with API
            const isValid = await validateWord(currentGuess);
            if (!isValid) {
              alert('Not a valid word');
              return;
            }

            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            });
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key.toLowerCase();
                });
            }
        }
    };

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup};
};

export default useWordle;