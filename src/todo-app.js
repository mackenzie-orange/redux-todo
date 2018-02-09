import _map from "lodash.map";
import React from "react";
import _filter from "lodash.filter";
import PropTypes from "prop-types";
import { TOGGLE_TODO, SET_VISIBILITY_FILTER, SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL, ADD_TODO } from "./constants";
import { connect } from 'react-redux';

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

const mapDispatchToTodoListProps = (dispatch) => {
    const onTodoClick = id => dispatch({
        type: TOGGLE_TODO,
        id,
    });
    return {
        onTodoClick
    };
};

const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);

let nextTodoId = 0;

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

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active : ownProps.filter === state.visibilityFilter
    };
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch({
                type: SET_VISIBILITY_FILTER,
                filter: ownProps.filter,
            });
        }
    };
};

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
                dispatch({
                    type: ADD_TODO,
                    id: nextTodoId++,
                    text: input.value
                });
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
