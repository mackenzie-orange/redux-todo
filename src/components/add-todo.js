import React from "react";
import {addTodo} from "../actions";
import {connect} from "react-redux";

let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input ref={ node => input = node } />
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = '';
            }}>Add Todo Item</button>
        </div>
    )
};

// no need to subscribe to the store, no arguments will not supply store and will supply the dispatch
AddTodo = connect()(AddTodo);

export default AddTodo;
