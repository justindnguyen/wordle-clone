import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn, shakeRow }) {
    return (
        <div>
            {guesses.map((guess, index) => {
                if (turn === index) {
                    return <Row key={index} currentGuess={currentGuess} shake={shakeRow} />
                }
                return <Row key={index} guess={guess} />
            })}
        </div>
    );
};