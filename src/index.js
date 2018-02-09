import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import TodoApp from './todo-app';
import {todoApp} from "./reducers";
import {loadState, saveState} from "./local-storage";
import _throttle from 'lodash.throttle'

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

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);


