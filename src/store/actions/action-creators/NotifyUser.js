// error message notifier
import { NOTIFY_USER } from '../types/NotifyUserTypes'

const notifyUser = (messageObj) => dispatch => {
    return dispatch({
        type: NOTIFY_USER,
        payload: messageObj
    });
}

export default notifyUser;