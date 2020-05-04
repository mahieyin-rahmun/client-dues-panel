import { actionTypes } from 'redux-firestore';

// action to clear out state to avoid data lag
const logoutCleanup = () => dispatch => {
    dispatch({
        type: actionTypes.CLEAR_DATA
    });
}

export default logoutCleanup;