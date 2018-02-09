import React from "react";
import Footer from "./components/footer";
import VisibleTodoList from "./components/visible-todo-list";
import AddTodo from './components/add-todo';

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default TodoApp;
