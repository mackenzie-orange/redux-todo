import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import expect from 'expect';
import {combineReducers, createStore} from 'redux';
import {Provider} from "react-redux";
import TodoApp from './todo-app';
import {ADD_TODO, GO_SHOPPING, LEARN_REDUX, TOGGLE_TODO} from "./constants";
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


// Tests below

const testTodos = () => {
    const stateBefore = [];
    const action = {
        type: ADD_TODO,
        id: 0,
        text: LEARN_REDUX,
    };
    const stateAfter = [{
        id: 0,
        text: LEARN_REDUX,
        completed: false,
    }];

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: LEARN_REDUX,
            completed: false,
        },
        {
            id: 1,
            text: GO_SHOPPING,
            completed: false,
        }
    ];
    const action = {
        type: TOGGLE_TODO,
        id: 1,
    };
    const stateAfter = [
        {
            id: 0,
            text: LEARN_REDUX,
            completed: false,
        },
        {
            id: 1,
            text: GO_SHOPPING,
            completed: true,
        }
    ];

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testTodos();

testToggleTodo();
