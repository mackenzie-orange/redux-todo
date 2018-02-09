import _map from "lodash.map";
import React from "react";
import _filter from "lodash.filter";
import { TOGGLE_TODO, SET_VISIBILITY_FILTER, SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL, ADD_TODO } from "./constants";
import { connect } from 'react-redux';

// Action Creators
let nextTodoId = 0;
const addTodo = (text) => ({
    type: ADD_TODO,
    id: nextTodoId++,
    text,
});

const setVisibilityFilter = (ownProps) => ({
    type: SET_VISIBILITY_FILTER,
    filter: ownProps.filter,
});

const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id,
});

const Todo = ({ onClick, completed, text }) => {
    const style = {  textDecoration: completed ? 'line-through' : 'none' };
    return (<li onClick={onClick} style={style}> {text} </li>)
};

const TodoList = ({ todos, onTodoClick }) => {
    const getTodoItem = (todo) => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>;
    const todoItems = _map(todos, getTodoItem);
    return (<ul> { todoItems } </ul>);
};

const mapStateToTodoListProps = (state) => {
    const { todos:oldTodos, visibilityFilter } = state;
    const todos = getVisibleTodos(oldTodos, visibilityFilter);
    return {
        todos
    };
};

const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id))
    },
});

const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);


const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }
    else {
        const getOnClick = e => {
            e.preventDefault();
            onClick()
        };
        return <a href='#' onClick={getOnClick}> {children} </a>;
    }
};

const mapStateToLinkProps = (state, ownProps) => ({
    active : ownProps.filter === state.visibilityFilter,
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps));
    }
});

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
    <p>
        Show:
        { ' ' }
        <FilterLink filter={SHOW_ALL} > All </FilterLink>
        <FilterLink filter={SHOW_ACTIVE} > Active </FilterLink>
        <FilterLink filter={SHOW_COMPLETED} > Completed </FilterLink>
    </p>
);


let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input ref={ node => input = node } />
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>Add Todo Item</button>
        </div>
    )
};

// no need to subscribe to the store, no arguments will not supply store and will supply the dispatch
AddTodo = connect()(AddTodo);

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case SHOW_ALL:
            return todos;
        case SHOW_ACTIVE:
            return _filter(todos, (todo) => !todo.completed);
        case SHOW_COMPLETED:
            return _filter(todos, (todo) => todo.completed);
        default:
            return todos;
    }
};

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default TodoApp;
