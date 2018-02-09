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
        // eslint-disable-next-line
        return <a href='#' onClick={getOnClick}> {children} </a>;
    }
};
