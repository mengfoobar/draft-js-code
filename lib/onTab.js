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

/**
 * Handle pressing shift + tab in the editor
 *
 * @param {SyntheticKeyboardEvent} event
 * @param {Draft.EditorState} editorState
 * @return {Draft.EditorState}
 */
function onShiftTab(e, editorState) {
  e.preventDefault();

  var contentState = editorState.getCurrentContent();
  var selection = editorState.getSelection();

  var indentation = getDefaultIndentation();
  var newContentState;

  var currentBlockKey = selection.getFocusKey();
  var block = contentState.getBlockForKey(currentBlockKey);
  var blockText = block.getText();
  var originalStartIndex = selection.getFocusOffset();

  if (blockText.substring(0, originalStartIndex).trim() != '') {
    return null;
  }

  if (blockText.indexOf(indentation) !== -1) {
    var startIndex = blockText.indexOf(indentation);
    var selection = new Draft.SelectionState({
      anchorKey: currentBlockKey,
      anchorOffset: startIndex,
      focusKey: currentBlockKey,
      focusOffset: startIndex + indentation.length
    });
    contentState = Draft.Modifier.replaceText(contentState, selection, '');
    var newEditorState = Draft.EditorState.push(
      editorState,
      contentState,
      'remove-range'
    );

    newEditorState = Draft.EditorState.forceSelection(
      newEditorState,
      new Draft.SelectionState({
        anchorKey: currentBlockKey,
        anchorOffset: originalStartIndex - indentation.length,
        focusKey: currentBlockKey,
        focusOffset: originalStartIndex - indentation.length
      })
    );
    return newEditorState;
  } else {
    return null;
  }
}

module.exports = { onTab, onShiftTab };
