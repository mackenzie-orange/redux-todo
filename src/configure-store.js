import {loadState, saveState} from "./local-storage";
import {createStore} from "redux";
import {todoApp} from "./reducers";
import _throttle from 'lodash.throttle'

export const configureStore = () => {
    const persistedState = loadState();

    const store = createStore(
        todoApp,
        persistedState
    );

    store.subscribe(_throttle(() => {
        saveState({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
};
