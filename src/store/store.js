// https://github.com/prescottprue/react-redux-firebase

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import firebaseConfig from "./FirebaseConfig";

// Other Reducers
import notifyReducer from './reducers/NotifyReducer';

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Add firebase to reducers, other reducers will also go here
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    // notify reducer
    notify: notifyReducer
});

// thunk middleware
const middleware = [thunk];

// Create store with reducers and initial state
const initialState = {}
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// need this in ReactReduxFirebaseProvider
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

// needed in index.js
export {
    store,
    rrfProps
};
