// Action Creators
import {ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO} from "./constants";
import { v4 } from 'node-uuid';

export const addTodo = (text) => ({
    type: ADD_TODO,
    id: v4(),
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
