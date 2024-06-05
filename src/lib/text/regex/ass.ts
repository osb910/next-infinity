/**
 * .ass Filetype Regular Expressions
 */

export const ASS_REGEX = Object.freeze({
  /*         regex        |              matches
    -----------------------------------------------------------------------------------
    ^[DC]                   | begins with D or C (for Dialogue OR Comment)
    \w+                     | (ialogue: ) OR (omment: ) = one or more non-digits
    (\d{1,10})              | Layer = number of max 10 digits (capturing)
    ,                       | literal comma
    ([\d:.]+)               | Start / End = one or more digits, colons, or dots (capturing)
    ([^,]+)                 | Style = one or more non-commas (capturing)
    ([^,]*)                 | Actor = zero or more non-commas (optional) (capturing)
    (\d{1,4})               | Left / Right / Vertical margins = number of max 4 digits (capturing)
    ([^,]*)                 | Effect = zero or more (optional) non-commas (capturing)*/
  meta: /^([DC]\w+): (\d{1,10}),([\d:.]+),([\d:.]+),([^,]+),([^,]*),(\d{1,4}),(\d{1,4}),(\d{1,4}),([^,]*),/,

  /*         regex              |              matches
  -----------------------------------------------------------------------------------------
  ((?:\s*\{[^}]*\}\s*)*)        | ass tag(s) = optional spaces, then {, then zero or more
                                | of anything but }, then }, then optional spaces, zero
                                | or more of all that, and capturing the whole thing.
  (\s*(?:m\s[-\d\s.blmp\\}]+)?) | vectors = optional spaces, then m, then anything of
                                | [hyphen, number, dot, space, b, m, l, p, backslash, or
                                | closing curly brace] one or more. All optional and capturing.
  (.*?)                         | translation = any text including inline tags (capturing).
  ((?:\s*\{[^}]*\}\s*)*)$       | ass tag(s) = optional spaces, then {, then zero or more
                                | of anything but }, then }, then optional spaces, zero
                                | or more of all that, and capturing the whole thing.*/
  body: /((?:\s*\{[^}]*\}\s*)*)(\s*(?:m\s[-\d\s.blmp\\}]+)?)(.*?)((?:\s*\{[^}]*\}\s*)*)$/,
  line: /^(([DC]\w+): (\d{1,10}),([\d:.]+),([\d:.]+),([^,]+),([^,]*),(\d{1,4}),(\d{1,4}),(\d{1,4}),([^,]*),)(((?:\s*\{[^}]*\}\s*)*)(\s*(?:m\s[-\d\s.blmp\\}]+)?)(.*?)((?:\s*\{[^}]*\}\s*)*))$/,
  styles:
    /^Style: ([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),(.+)$/g,
  lastTags: /((?:\s*\{[^}]*\}\s*)*)$/,
  metaTagsVectors:
    /^([DC]\w+): (\d{1,10}),([\d:.]+),([\d:.]+),([^,]+),([^,]*),(\d{1,4}),(\d{1,4}),(\d{1,4}),([^,]*),((?:\s*\{[^}]*\}\s*)*)(\s*(?:m\s[-\d\s.blmp\\}]+)?)/,
});
