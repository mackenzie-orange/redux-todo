import {Provider} from "react-redux";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import TodoApp from "../todo-app";

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={TodoApp} />
        </BrowserRouter>
    </Provider>
);

export default Root;
