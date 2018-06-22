// @flow
import type {} from '../reducers/dialog';

export const ALERT = 'ALERT';

export function alert(_show, _title, _text) {
  return {
    type: ALERT, show: _show, title: _title, text: _text,
  };
}
