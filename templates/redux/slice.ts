import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { <%=constantName %>_REDUCER_NAME } from './constants';
import { <%=type%>State } from './types';

export const initialState: <%=type%>State = { };

const slice = createSlice({
  name: <%=constantName%>_REDUCER_NAME,
  initialState,
  reducers: {
  setBalancerList: (state, { payload }: PayloadAction<{}>): <%=type%>State => ({
    ...state,
    ...payload,
  }),
  exampleSaga: (state, _payload: PayloadAction<{}>) => state,
},
});

export const <%=name%>Actions = slice.actions;

export default slice.reducer;
