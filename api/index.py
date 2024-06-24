from flask import Flask, request, jsonify
import subprocess
import json
from os import path
import sys
from src.python.py_regex.methods import methods
 
app = Flask(__name__)

# Set the correct path to your script
# SCRIPT_PATH = path.join('src', 'python', 'py_regex', 'pypi-regex.py')
# Use the full path to the Python interpreter
# PYTHON_PATH = 'python' if sys.platform.startswith('win') else 'python3'
# PYTHON_PATH = sys.executable

# Define a route that listens to GET requests
@app.route("/api/py-regex", methods=['GET'])
def hello_world():
    # data = request.json
    # print(data)
    # This function gets called when a GET request hits the /api/hello endpoint
    # command = [
    #     PYTHON_PATH, SCRIPT_PATH,
    #     'findall',
    #     '\\w+',
    #     'Hello, people!',
    #     # '--flags', 'imv',
    # ]
    
    try:
        res = methods['findall']('\\w+', 'Hello, people!')
        return jsonify({'output': res})
    except subprocess.CalledProcessError as e:
        return jsonify({'error': str(e), 'output': e.output}), 400

# Check if the current script is the one being run 'main'
# if __name__ == '__main__':
    # Starts the Flask application on port 5328
    # app.run(port=5328, debug=True)