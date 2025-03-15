# Nivea Soft Game - Proof of Concept

This is a proof of concept for the Nivea Soft interactive web game, implementing a basic Flask server that will serve as the backend for the game.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- On macOS/Linux:
```bash
source venv/bin/activate
```
- On Windows:
```bash
.\venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the Flask server:
```bash
python main.py
```

The server will start on `http://localhost:5000`

## Available Endpoints

- `GET /` - Home route, returns welcome message
- `GET /api/game/catch-the-soft/state` - Get current game state
- `POST /api/game/catch-the-soft/score` - Submit a game score

## Development

This is a proof of concept implementing the "Catch the Soft" mini-game from the larger Nivea Soft interactive web game project. The current implementation includes basic API endpoints that will be expanded as development continues.

