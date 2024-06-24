import regex

flag_map = {
    't': regex.TEMPLATE,
    'i': regex.IGNORECASE,
    'l': regex.LOCALE,
    'm': regex.MULTILINE,
    's': regex.DOTALL,
    'u': regex.UNICODE,
    'x': regex.VERBOSE,
    'a': regex.ASCII,
    'v': regex.VERSION1,
    'd': regex.DEBUG,
    'r': regex.REVERSE,
    'w': regex.WORD,
    'v0': regex.VERSION0,
    'b': regex.BESTMATCH,
    'f': regex.FULLCASE,
    'e': regex.ENHANCEMATCH,
    'p': regex.POSIX,
}