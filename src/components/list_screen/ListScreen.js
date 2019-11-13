import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {editList} from '../../store/actions/actionCreators';
import {deleteList} from '../../store/actions/actionCreators';


import {bindActionCreators} from 'redux';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e,editionType) => {
        const { target } = e;

        // this.setState(state => ({
        //     ...state,
        //     [target.id]: target.value,
        // }));
        this.props.editList(this.props.todoList.id, editionType,e.target.value,e.target.value);
        // this.props.editList();
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
        return <React.Fragment />

        return (
            <div className="container white">
                <div>
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <Link path="/">
                    <image id="list_trash" onClick={()=>this.props.deleteList(todoList.id)}>&#128465;</image>
                </Link>
                </div>
                
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" value={todoList.name} type="text" name="name" id="name" onChange={(e)=>this.handleChange(e,"name")} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.props.editList("owner",)} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        editList:(x,y,z,w)=>{dispatch(editList(x,y,z,w))},
        deleteList: (id)=>{dispatch(deleteList(id))}
    }
}


const mapStateToProps = (state, ownProps) => {
   
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
  todoList.id = id;
   


  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);