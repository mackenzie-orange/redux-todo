import {connect} from "react-redux";
import {TodoList} from "./todo-list";
import {toggleTodo} from "../actions";
import {SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED} from "../constants";
import _filter from "lodash.filter";

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

export default VisibleTodoList;
