import {ADD_TODO, GO_SHOPPING, LEARN_REDUX, SET_VISIBILITY_FILTER, SHOW_ALL, TOGGLE_TODO} from "./constants";
import _map from "lodash.map";
import expect from "expect";
import {combineReducers} from "redux";

const todo = (state, action) => {
    switch(action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case TOGGLE_TODO:
            if (state.id === action.id) {
                return {
                    ...state,
                    completed: !state.completed,
                };
            }
            return state;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action)
            ];
        case TOGGLE_TODO:
            return _map(state, (item) => {
                return todo(item, action);
            });
        default:
            return state;
    }
};

const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export const todoApp = combineReducers({
    todos,
    visibilityFilter,
});


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
