const initialState = {
  socket: null
}

export const CREATE_SOCKET = 'CREATE_SOCKET'

export const createSocket = (socket) => {
  return {
    type: CREATE_SOCKET,
    payload: {
      socket
    }
  }
}


export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SOCKET:
      return {
        ...state, socket: action.payload.socket
      }
      default:
        return state;
  }
}