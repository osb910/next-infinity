import argparse
import json
from methods import *

methods = {
  'match': regex_match,
  'fullmatch': regex_fullmatch,
  'search': regex_search,
  'findall': regex_findall,
  'finditer': regex_finditer,
  'split': regex_split,
  'sub': regex_sub,
  'subn': regex_subn
}

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description='Regex matcher')
  parser.add_argument('method', type=str, help='Method to use (match, fullmatch, search, findall, finditer, split, sub, subn)')
  parser.add_argument('pattern', type=str, help='Regular expression pattern to search for')
  parser.add_argument('text', type=str, help='Text input to search for regex pattern')
  parser.add_argument('--r', type=str, default='', help='Replacement string for the sub and subn methods')
  parser.add_argument('--flags', type=str, default='', help='Optional flags for the regex')
  parser.add_argument('--fuzzy', type=str, default='', help='Optional fuzzy matching for the regex')
  args = parser.parse_args()
  
  if args.method not in methods:
    print(json.dumps({'errors': [f"Method {args.method} not recognized"]}))
    exit(1)
  
  response = None

  try:
    method = methods[args.method]
    pattern, text, flags, repl = args.pattern, args.text, args.flags, args.r
    if method == 'sub' or method == 'subn':
      result = method(pattern, text, flags=flags, repl=repl)
    else:
      result = method(pattern, text, flags=flags)
    response = json.dumps(result)
  except Exception as err:
    response = json.dumps({'errors': err.args})
  
  print(response)
