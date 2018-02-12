import {Provider} from "react-redux";
import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import TodoApp from "../todo-app";

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/:filter" component={TodoApp} />
            </div>
        </BrowserRouter>
    </Provider>
);

export default Root;
