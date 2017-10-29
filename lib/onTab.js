var Draft = require('draft-js');
var getDefaultIndentation = require('./utils/getIndentation')
  .getDefaultIndentation;

// TODO: tab should complete indentation instead of just inserting one

/**
 * Handle pressing tab in the editor
 *
 * @param {SyntheticKeyboardEvent} event
 * @param {Draft.EditorState} editorState
 * @return {Draft.EditorState}
 */
function onTab(e, editorState) {
  e.preventDefault();

  var contentState = editorState.getCurrentContent();
  var selection = editorState.getSelection();

  var indentation = getDefaultIndentation();
  var newContentState;

  if (selection.isCollapsed()) {
    newContentState = Draft.Modifier.insertText(
      contentState,
      selection,
      indentation
    );
  } else {
    newContentState = Draft.Modifier.replaceText(
      contentState,
      selection,
      indentation
    );
  }

  return Draft.EditorState.push(
    editorState,
    newContentState,
    'insert-characters'
  );
}

module.exports = onTab;
