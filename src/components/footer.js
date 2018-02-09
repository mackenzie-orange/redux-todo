import {SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED} from "../constants";
import FilterLink from "./filter-link";
import React from "react";

const Footer = () => (
    <p>
        Show:
        { ' ' }
        <FilterLink filter={SHOW_ALL} > All </FilterLink>
        <FilterLink filter={SHOW_ACTIVE} > Active </FilterLink>
        <FilterLink filter={SHOW_COMPLETED} > Completed </FilterLink>
    </p>
);

export default Footer;
