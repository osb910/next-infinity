from flask import Flask, request, jsonify
import subprocess
import json
import regex
from src.python.py_regex.methods import methods, flag_map
 
app = Flask(__name__)

@app.route("/api/py/py-regex", methods=['POST'])
def py_regex():
    data = request.json
    
    # Validate that request contains JSON data
    if not data:
        return jsonify({'status': 'error', 'message': 'No JSON data provided', 'code': 400})
    
    # Validate required fields
    if 'pattern' not in data:
        return jsonify({'status': 'error', 'message': 'Missing required field: pattern', 'code': 400})
    
    if 'text' not in data:
        return jsonify({'status': 'error', 'message': 'Missing required field: text', 'code': 400})
    
    
    method = data.get('method', 'findall')
    
    # Validate method is supported
    if method not in methods:
        valid_methods = list(methods.keys())
        return jsonify({
            'status': 'error', 
            'message': f'Invalid method: {method}. Valid methods are: {valid_methods}',
            'code': 400
        })
        
    # Validate data types
    if not isinstance(data['pattern'], str):
        return jsonify({'status': 'error', 'message': 'pattern must be a string', 'code': 400})
    
    if not isinstance(data['text'], str):
        return jsonify({'status': 'error', 'message': 'text must be a string', 'code': 400})
    
    # Check for repl parameter for sub and subn methods
    if method in ['sub', 'subn']:
        if 'repl' not in data:
            return jsonify({'status': 'error', 'message': 'Missing required field: repl for sub/subn methods', 'code': 400})
        if not isinstance(data['repl'], str):
            return jsonify({'status': 'error', 'message': 'repl must be a string', 'code': 400})
    
    # Process flags if provided
    if 'flags' in data:
        if not isinstance(data['flags'], list):
            return jsonify({'status': 'error', 'message': 'flags must be an array of strings', 'code': 400})
            
        for flag in data['flags']:
            if not isinstance(flag, str):
                return jsonify({'status': 'error', 'message': 'Each flag must be a string', 'code': 400})
                
            if flag not in flag_map:
                valid_flags = list(flag_map.keys())
                return jsonify({
                    'status': 'error', 
                    'message': f'Invalid flag: {flag}. Valid flags are: {valid_flags}',
                    'code': 400
                })
            
    pattern = data.get('pattern')
    text = data.get('text')
    flags = data.get('flags', [])
    
    try:
        if method in ['sub', 'subn']:
            repl = data.get('repl')
            res = methods[method](pattern, text, repl=repl, flags=flags)
        else:
            res = methods[method](pattern, text, flags=flags)
            
        return jsonify({'status': 'success', 'code': 200, 'data': res})
    except regex.error as e:
        # Handle invalid regex pattern
        return jsonify({'status': 'error', 'message': f'Invalid regex pattern: {str(e)}', 'code': 400})
    except subprocess.CalledProcessError as e:
        return jsonify({'status': 'error', 'message': str(e), 'code': 500, 'data': e.output})
    except Exception as e:
        # Catch any other unexpected errors
        return jsonify({'status': 'error', 'message': f'Unexpected error: {str(e)}', 'code': 500})

# Check if the current script is the one being run 'main'
# if __name__ == '__main__':
    # Starts the Flask application on port 5328
    # app.run(port=5328, debug=True)