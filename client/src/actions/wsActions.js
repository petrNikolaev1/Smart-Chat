import ws from '@/util/ws'

export const wsAction = payload => dispatch => {
    const {actionType, wsType, actionData, wsData} = payload;
    ws.emit(JSON.stringify({type: wsType, data: wsData}));
    dispatch({type: actionType, payload: {...actionData}});
};
