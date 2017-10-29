var detectIndent = require('detect-indent');

var DEFAULT_INDENTATION = '    ';

/**
 * Detect indentation in a text
 * @param {String} text
 * @return {String}
 */
function getIndentation(text) {
  var result = detectIndent(text);
  return result.indent || DEFAULT_INDENTATION;
}

/**
 * Gets the default indentation
 * @return {String}
 */
function getDefaultIndentation() {
  return DEFAULT_INDENTATION;
}

module.exports = { getDefaultIndentation, getIndentation };
