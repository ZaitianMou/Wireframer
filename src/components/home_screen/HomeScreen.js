import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframerLinks from './WireframerLinks';
import {addList} from '../../store/actions/actionCreators';
import { Link } from 'react-router-dom';

class HomeScreen extends Component {
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframerLinks />
                    </div>


                    <div className="col s8">
                        <div className="banner">
                            Wireframers<br />
                        </div>
                        
                        <div className="home_new_list_container">
                            {/*  path below should be similiar with that/todoList"+todoLists[0].id */}
                                <Link  to="/" className="home_new_list_button"  />
                                    <button className="home_new_list_button" onClick={this.handleAddList}  >
                                        Create a New Wireframer
                                    </button>
                                <Link />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleAddList=()=>{
        this.props.addList(this.props.history);
    }
   
}

const mapDispatchToProps=(dispatch)=>{
    return {
        addList:(x)=>{dispatch(addList(x))}
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        todoLists: state.firestore.data
    };
};

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['lastOpened','desc']},
    ]),
)(HomeScreen);