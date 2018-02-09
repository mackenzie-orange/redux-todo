import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {combineReducers, createStore} from 'redux';
import {Provider} from "react-redux";
import TodoApp from './todo-app';
import {todos, visibilityFilter} from "./reducers";

const todoApp = combineReducers({
    todos,
    visibilityFilter,
});

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);


