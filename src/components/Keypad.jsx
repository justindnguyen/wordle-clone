import { useEffect, useState } from "react";

export default function Keypad({ usedKeys, handleKey }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const qwerty = [
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l'],
            ['⏎','z','x','c','v','b','n','m','⌫']
        ];
        setRows(qwerty);
    }, []);

    return (
        <div className="keypad">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="keypad-row">
                    {row.map((key) => {
                        const color = usedKeys[key.toLowerCase()];
                        const label =
                            key === 'Enter' ? '⏎' :
                            key === 'Backspace' || key === 'Delete' ? '⌫' : 
                            key;
                        return (
                            <div
                                key={key}
                                className={`key ${color}`}
                                onClick={() => handleKey(key)}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};