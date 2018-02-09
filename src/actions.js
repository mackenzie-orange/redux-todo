// Action Creators
import {ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO} from "./constants";

let nextTodoId = 0;
export const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextTodoId++,
    text,
});

export const setVisibilityFilter = (ownProps) => ({
    type: SET_VISIBILITY_FILTER,
    filter: ownProps.filter,
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id,
});
