export default function Modal({ isCorrect, turn, solution}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses! 😀</p>
                    <button onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Sorry!</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time! 😉</p>
                    <button onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}
        </div>
    );
};