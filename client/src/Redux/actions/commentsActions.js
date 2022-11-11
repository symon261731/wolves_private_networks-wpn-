import axios from 'axios';

import {
  SET_COMMENT,
  ADD_COMMENT,
} from '../type';

export const setComment = (payload) => ({ type: SET_COMMENT, payload });
export const addComment = (payload) => ({ type: ADD_COMMENT, payload });

// export const setCommentsThunk = (input) => (dispatch) => {
//   axios
//     .get('/server/all', { input })
//     .then((res) => dispatch(setComment(res.data)))
//     .catch(console.log);
// };

export const setCommentsOfUserThunk = (id) => (dispatch) => {
  axios
    .get(`/comment/user/all/${id}`)
    .then((res) => { dispatch(setComment(res.data)); })
    .catch(console.log);
};

export const addCommentOfUserThunk = (input, setInput, id) => (dispatch) => {
  axios
    .post(`/comment/user/new/${id}`, { input })
    .then((res) => { dispatch(addComment(res.data)); })
    .then(() => setInput(''))
    .catch(console.log);
};
