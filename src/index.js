import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import expect from 'expect';
import _map from 'lodash.map';
import _filter from 'lodash.filter';
import { combineReducers, createStore} from 'redux';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SHOW_ALL = 'SHOW_ALL';
const SHOW_ACTIVE = 'SHOW_ACTIVE';
const SHOW_COMPLETED = 'SHOW_COMPLETED';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

const LEARN_REDUX = 'Learn Redux';

const GO_SHOPPING = 'Go Shopping';

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

const todoApp = combineReducers({
    todos,
    visibilityFilter,
});

const store = createStore(todoApp);

let nextTodoId = 0;

const FilterLink = ({filter, currentFilter, children, onClick}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               onClick(filter);
               store.dispatch({
                   type: 'SET_VISIBILITY_FILTER',
                   filter
               });
           }}
        >
            {children}
        </a>
    );
};

const Footer = ({visibilityFilter, onFilterClick}) => {
    return (<p>
        Show:
        { ' ' }
        <FilterLink filter={SHOW_ALL} currentFilter={visibilityFilter} onClick={onFilterClick}> All </FilterLink>
        <FilterLink filter={SHOW_ACTIVE} currentFilter={visibilityFilter} onClick={onFilterClick}> Active </FilterLink>
        <FilterLink filter={SHOW_COMPLETED} currentFilter={visibilityFilter} onClick={onFilterClick}> Completed </FilterLink>
    </p>);
};

const Todo = ({ onClick, completed, text }) => {
    const style = {  textDecoration: completed ? 'line-through' : 'none' };
    return (<li onClick={onClick} style={style}> {text} </li>)
};

const TodoList = ({ todos, onTodoClick }) => {
    const getTodoItem = (todo) => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>;
    const todoItems = _map(todos, getTodoItem);
    return (<ul> { todoItems } </ul>);
};

const AddTodo = (onAddClick) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node
            }} />
            <button onClick={() => {
                onAddClick(input.value);
                input.value = '';
            }}>Add Todo Item</button>
        </div>
    )
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

const TodoApp = ({todos, visibilityFilter}) => (
    <div>
        <AddTodo onAddClicked={text =>
            store.dispatch({
                type: ADD_TODO,
                id: nextTodoId++,
                text
            })
        }/>
        <TodoList todos={getVisibleTodos(todos, visibilityFilter)} onTodoClick={id =>
            store.dispatch({
                type: TOGGLE_TODO,
                id
            })
        }/>
        <Footer visibilityFilter={visibilityFilter} onFilterClick={filter =>
            store.dispatch({
                type: SET_VISIBILITY_FILTER,
                filter
            })
        }/>
    </div>
);

const render = () => {
    ReactDOM.render(<TodoApp { ...store.getState() }/>, document.getElementById('root'));
};

store.subscribe(render);
render();


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
