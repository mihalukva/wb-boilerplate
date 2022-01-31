import { takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { actions } from '../../slice';

function* worker({ payload }: PayloadAction<{}>) {
  try {

  } catch (error) {

  } finally {

  }
}

export function* watcher() {
  yield takeLatest(actions.<%=name%>Saga, worker);
}
