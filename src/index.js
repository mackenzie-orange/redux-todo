import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import expect from 'expect';

const ADD_TODO = 'ADD_TODO';

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
        default:
            return state;
    }
};

const testTodos = () => {
    const stateBefore = [];
    const action = {
        type: ADD_TODO,
        id: 0,
        text: 'Learn Redux',
    };
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false,
    }];

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testTodos();


ReactDOM.render(<App />, document.getElementById('root'));
