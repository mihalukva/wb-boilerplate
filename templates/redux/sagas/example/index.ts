import { takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { <%=name%>Actions } from '../../slice';

function* worker({ payload }: PayloadAction<{}>) {
  try {

  } catch (error) {

  } finally {

  }
}

export function* watcher() {
  yield takeLatest(<%=name%>Actions.exampleSaga, worker);
}
