// @flow
export const DIALOG = 'DIALOG';

export function setDialog(_show, _text) {
  return {
    type: DIALOG, dialog: { show: _show, text: _text }
  };
}
