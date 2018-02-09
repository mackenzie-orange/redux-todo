import Todo from "./todo";
import _map from "lodash.map";
import React from "react";

export const TodoList = ({ todos, onTodoClick }) => {
    const getTodoItem = (todo) => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>;
    const todoItems = _map(todos, getTodoItem);
    return (<ul> { todoItems } </ul>);
};
