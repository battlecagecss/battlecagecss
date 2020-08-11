import * as types from '../constants/actionTypes';

export const addVote = () => ({
  type: types.ADD_VOTE,
});

export const deleteVote = () => ({
  type: types.SUBTRACT_VOTE,
});
