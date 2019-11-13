import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import {addList} from '../../store/actions/actionCreators';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import ListScreen from '../list_screen/ListScreen';

class HomeScreen extends Component {

    

    render() {
        const todoLists=this.props.todoLists;

        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                            {/*  path below should be similiar with that/todoList"+todoLists[0].id */}
                                <Link  path="/" className="home_new_list_button"  />
                                    <button className="home_new_list_button" onClick={this.handleAddList}  >
                                        Create a New To Do List
                                    </button>
                                <Link />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleAddList=()=>{
        this.props.addList();
    }
   
}

const mapDispatchToProps=(dispatch)=>{
    return {
        addList:()=>{dispatch(addList())}
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
      { collection: 'todoLists' },
    ]),
)(HomeScreen);