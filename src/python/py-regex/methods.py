import regex
from flags import flag_map

def parse_match(match):
  """
  Parse a match object into a dictionary.
  """
  groups = list(match.groups())
  allspans = [
    list(s[0]) if len(s) > 0 else s for s in list(match.allspans())
  ]

  result = {
    'match': match.group(),
    'groups': groups,
    'matches': [match.group()] + groups,
    'allcaptures': match.allcaptures(),
    'span': match.span(),
    'allspans': allspans,
    'regs': match.regs,
    'groupdict': match.groupdict(),
    'capturesdict': match.capturesdict(),
    'pos': match.pos,
    'endpos': match.endpos,
    'partial': match.partial,
    'lastindex': match.lastindex,
    'lastgroup': match.lastgroup,
    'fuzzy_changes': match.fuzzy_changes,
    'fuzzy_counts': match.fuzzy_counts,
    'string': match.string,
    'pattern': match.re.pattern,
  }
  
  return result

def regex_match(pattern, text, flags=''):    
  """
  Return a dictionary of the match result.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  
  compiled_regex = regex.compile(pattern, flag_sum)
  res = compiled_regex.match(text)
  
  if res is None:
    return None
  
  result = parse_match(res)
  result['flags'] = flags

  return result

def regex_fullmatch(pattern, text, flags=''):
  """
  Return a dictionary of the fullmatch result.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  compiled_regex = regex.compile(pattern, flag_sum)
  res = compiled_regex.fullmatch(text)
  
  if res is None:
    return None

  result = parse_match(res)
  result['flags'] = flags
  
  return result

def regex_search(pattern, text, flags=''):
  """
  Return a dictionary of the search result.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  compiled_regex = regex.compile(pattern, flag_sum)
  res = compiled_regex.search(text)
  
  if res is None:
    return None

  result = parse_match(res)
  result['flags'] = flags
  
  return result

def regex_findall(pattern, text, flags=''):
  """
  This function accepts a text input, a regex pattern,
  and optional flags for the regex,
  and returns the results matched by the regex.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  compiled_regex = regex.compile(pattern, flag_sum)
  matches = compiled_regex.findall(text)
  
  return matches

def regex_finditer(pattern, text, flags=''):
  """
  This function accepts a text input, a regex pattern,
  and optional flags for the regex,
  and returns a list of dictionaries of the results matched by the regex.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  compiled_regex = regex.compile(pattern, flag_sum)
  matches = compiled_regex.finditer(text)

  return [parse_match(match) for match in matches]

def regex_split(pattern, text, flags=''):
  """
  This function accepts a text input, a regex pattern,
  and optional flags for the regex,
  and returns a list of dictionaries of the results matched by the regex.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  compiled_regex = regex.compile(pattern, flag_sum)
  matches = compiled_regex.split(text)

  return matches

def regex_sub(pattern, text, repl, flags=''):
  """
  This function accepts a text input, a regex pattern,
  a replacement string, and optional flags for the regex,
  and returns a list of replacements.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  compiled_regex = regex.compile(pattern, flag_sum)
  replaced_text = compiled_regex.sub(repl, text)

  return replaced_text

def regex_subn(pattern, text, repl, flags=''):
  """
  This function accepts a text input, a regex pattern,
  a replacement string, and optional flags for the regex,
  and returns a list of replacements.
  """
  flag_sum = sum(flag_map.get(flag, 0) for flag in flags)
  compiled_regex = regex.compile(pattern, flag_sum)
  replaced_text, count = compiled_regex.subn(repl, text)

  return replaced_text, count