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

const FilterLink = ({filter, currentFilter, children}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
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

class TodoApp extends React.Component {
    render() {
        const {
            todos,
            visibilityFilter
        } = this.props;

        const visibleTodos = getVisibleTodos(todos, visibilityFilter);

        return (
            <div>
                <input ref={node => {
                this.input = node
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type: ADD_TODO,
                        text: this.input.value,
                        id: nextTodoId++,
                    });
                    this.input.value = '';
                }}>Add Todo Item
                </button>
                <ul>
                    {_map(visibleTodos, (todo) =>
                        <li key={todo.id}
                                onClick={() => {
                                    store.dispatch({
                                        type: TOGGLE_TODO,
                                        id: todo.id,
                                    });
                                }}
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none'
                                }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <p>
                    Show:
                    { ' ' }
                    <FilterLink filter={SHOW_ALL} currentFilter={visibilityFilter}> All </FilterLink>
                    <FilterLink filter={SHOW_ACTIVE} currentFilter={visibilityFilter}> Active </FilterLink>
                    <FilterLink filter={SHOW_COMPLETED} currentFilter={visibilityFilter}> Completed </FilterLink>
                </p>
            </div>
        );
    }
}

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
