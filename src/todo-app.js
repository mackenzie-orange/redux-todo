import _map from "lodash.map";
import React from "react";
import _filter from "lodash.filter";
import PropTypes from "prop-types";
import { TOGGLE_TODO, SET_VISIBILITY_FILTER, SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL, ADD_TODO } from "./constants";

class VisibleTodoList extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const { store } = this.context;
        const state = store.getState();
        const { todos, visibilityFilter } = state;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
        const onTodoClick = id => store.dispatch({
            type: TOGGLE_TODO,
            id
        });
        return <TodoList todos={visibleTodos} onTodoClick={onTodoClick} />;
    }
}

VisibleTodoList.contextTypes = {
    store: PropTypes.object
};

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

class FilterLink extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { filter, children } = this.props;
        const { store } = this.context;
        const state = store.getState();
        const active = filter === state.visibilityFilter;
        const onClick = () => store.dispatch({
            type: SET_VISIBILITY_FILTER,
            filter
        });
        return <Link active={active} onClick={onClick}> {children} </Link>;
    }
}

FilterLink.contextTypes = {
    store: PropTypes.object
};

const Footer = () => (
    <p>
        Show:
        { ' ' }
        <FilterLink filter={SHOW_ALL} > All </FilterLink>
        <FilterLink filter={SHOW_ACTIVE} > Active </FilterLink>
        <FilterLink filter={SHOW_COMPLETED} > Completed </FilterLink>
    </p>
);

const Todo = ({ onClick, completed, text }) => {
    const style = {  textDecoration: completed ? 'line-through' : 'none' };
    return (<li onClick={onClick} style={style}> {text} </li>)
};

const TodoList = ({ todos, onTodoClick }) => {
    const getTodoItem = (todo) => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>;
    const todoItems = _map(todos, getTodoItem);
    return (<ul> { todoItems } </ul>);
};

const AddTodo = (props, { store }) => {
    let input;
    return (
        <div>
            <input ref={ node => input = node } />
            <button onClick={() => {
                store.dispatch({
                    type: ADD_TODO,
                    id: nextTodoId++,
                    text: input.value
                });
                input.value = '';
            }}>Add Todo Item</button>
        </div>
    )
};

AddTodo.contextTypes = {
    store: PropTypes.object
};

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
