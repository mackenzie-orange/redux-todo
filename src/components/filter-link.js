import {setVisibilityFilter} from "../actions";
import {Link} from "./link";
import {connect} from "react-redux";

const mapStateToLinkProps = (state, ownProps) => ({
    active : ownProps.filter === state.visibilityFilter,
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps));
    }
});

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);
export default FilterLink;
