import { <%=type%>StatePart, <%=type%>State } from './types';
import { <%=constantName%>_REDUCER_NAME } from './constants';
import { initialState } from './slice';

export const <%=name%>Selector = (state: <%=type%>StatePart): <%=type%>State => state[<%=constantName%>_REDUCER_NAME] || initialState;

