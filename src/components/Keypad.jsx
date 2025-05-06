import { useEffect, useState } from "react";

export default function Keypad({ usedKeys, handleKey }) {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/letters')
            .then(res => res.json())
            .then(json => {
                setLetters(json)
        })
    }, [])

    return (
        <div className="keypad">
            {letters && letters.map((letter) => {
                const key = letter.key;
                const color = usedKeys[letter.key];
                const label =
                    key === 'Enter' ? '⏎' :
                    key === 'Backspace' || key === 'Delete' ? '⌫' :
                    key;

                return (
                    <div key={key} className={color} onClick={() => handleKey(key)} >{label}</div>
                );
            })}
        </div>
    );
};