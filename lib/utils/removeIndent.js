var Draft = require('draft-js');

/**
 * Remove last indentation before cursor, return undefined if no modification is done
 *
 * @param {Draft.EditorState} editorState
 * @return {Draft.EditorState|undefined}
 */
function removeIndent(editorState) {
  var contentState = editorState.getCurrentContent();
  var selection = editorState.getSelection();

  var rangeToRemove = selection.merge({
    anchorKey: selection.focusKey,
    anchorOffset: selection.focusOffset,
    focusKey: selection.focusKey,
    focusOffset: selection.focusOffset - 4,
    isBackward: true
  });

  var newContentState = Draft.Modifier.removeRange(
    contentState,
    rangeToRemove,
    'backward'
  );

  return Draft.EditorState.push(editorState, newContentState, 'remove-range');
}

module.exports = removeIndent;
