import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import expect from 'expect';
import _map from 'lodash.map';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const LEARN_REDUX = 'Learn Redux';

const GO_SHOPPING = 'Go Shopping';

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case TOGGLE_TODO:
            return _map(state, (item) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                else {
                    return item;
                }
            });
        default:
            return state;
    }
};

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


ReactDOM.render(<App />, document.getElementById('root'));
