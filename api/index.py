from flask import Flask
import json
 
app = Flask(__name__)

# Define a route that listens to GET requests
@app.route("/api/hello", methods=['GET'])
def hello_world():
    # This function gets called when a GET request hits the /api/hello endpoint
    return json.dumps({'hello': "Hello, World!"})

# Check if the current script is the one being run 'main'
# if __name__ == '__main__':
    # Starts the Flask application on port 5328
    # app.run(port=5328, debug=True)