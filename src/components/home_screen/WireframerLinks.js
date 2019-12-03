import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframerCard from './WireframerCard';

class TodoListLinks extends React.Component {
    render() {
        const wireframers = this.props.wireframers;
        // console.log(todoLists);
        return (
            <div className="todo-lists section">
                {wireframers && wireframers.map(wireframer => (
                    <Link to={'/wireframer/' + wireframer.id} key={wireframer.id}>
                        <WireframerCard wireframer={wireframer} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframers: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);