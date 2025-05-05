import { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal'

export default function Wordle({ solution }) {
    const [message, setMessage] = useState('');
    const [shakeRow, setShakeRow] = useState(false);
    const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup } = useWordle(solution, setMessage);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener('keyup', handleKeyup);
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener('keyup', handleKeyup);
        }

        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, turn]);

    useEffect(() => {
        if (message) {
            setShakeRow(true);
            const timer = setTimeout(() => {
                setMessage('');
                setShakeRow(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} shakeRow={shakeRow} />
            <Keypad usedKeys={usedKeys} />
            <div className={`message ${message ? 'show' : ''}`}>{message}</div>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
        </div>
    );
};