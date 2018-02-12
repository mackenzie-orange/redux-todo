import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {configureStore} from "./configure-store";
import Root from "./components/root";

const store = configureStore();

ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
);
