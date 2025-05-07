# Wordle Clone

A Wordle clone built with React and Vite. This project replicates the core gameplay of the original Wordle, featuring animated tile feedback, an interactive QWERTY on-screen keyboard, keyboard input support, and real-time word validation using an external dictionary API. It also uses JSON Server to supply a list of random solution words locally.

![Screenshot of Wordle Clone](public/wordle.png)

---

## Features

- 6 tries to guess a random 5-letter word
- QWERTY on-screen keyboard with clickable keys
- Keys change color based on accuracy: green, yellow, or gray
- Tile flip animations on guess submission
- Shake animation and message popup for invalid entries
- Word validation via [dictionaryapi.dev](https://dictionaryapi.dev)
- Solution word fetched from a local `db.json` file using JSON Server
- End-of-game modal with a "Play Again" button

---

## Tech Stack

- React (with Vite)
- JSON Server
- Dictionary API
- Custom CSS for animations and layout

---

## Project Structure

```
wordle-clone/
├── data/
│   └── db.json
├── public/
│   └── wordle.png
├── src/
│   ├── components/
│   │   ├── Grid.jsx
│   │   ├── Keypad.jsx
│   │   ├── Modal.jsx
│   │   ├── Row.jsx
│   │   └── Wordle.jsx
│   ├── hooks/
│   │   └── useWordle.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/wordle-clone.git
cd wordle-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the JSON Server (for word list)

```bash
npm run api
```

### 4. Start the development server

```bash
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## License

This project is licensed under the MIT License.