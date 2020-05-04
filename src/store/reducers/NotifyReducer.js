// reducer for notifying user of error messages
import { NOTIFY_USER } from '../actions/types/NotifyUserTypes'

const initialState = {
    message: null
};

const notifyUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_USER:
            return {
                ...state,
                message: action.payload
            };
        
        default:
            return state;
    }
}

export default notifyUserReducer;