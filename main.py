from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Basic configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-this')

# Home route - serves the game
@app.route('/')
def home():
    return render_template('game.html')

# Game state endpoint (placeholder for now)
@app.route('/api/game/catch-the-soft/state', methods=['GET'])
def game_state():
    return jsonify({
        "status": "success",
        "game": "Catch the Soft",
        "active": True,
        "highScore": 0
    })

# Submit score endpoint
@app.route('/api/game/catch-the-soft/score', methods=['POST'])
def submit_score():
    data = request.get_json()
    score = data.get('score', 0)
    # TODO: Implement score validation and storage
    return jsonify({
        "status": "success",
        "message": "Score submitted successfully",
        "score": score
    })

if __name__ == '__main__':
    app.run(debug=True)
