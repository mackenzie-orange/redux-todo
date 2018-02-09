import React from "react";

export const Link = ({active, children, onClick}) => {
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
