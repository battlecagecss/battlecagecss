import * as types from '../constants/actionTypes';

const initialState = {
  votes: 0,
};

const marketsReducer = (state = initialState, action) => {
  let votes;

  switch (action.type) {
    case types.ADD_VOTE:
      votes = state.votes + 1;
      return { ...state, votes };
    case types.SUBTRACT_VOTE:
      votes = state.votes - 1;
      return { ...state, votes };
    default:
      return state;
  }
};

export default marketsReducer;
