import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

import {deleteList} from '../../store/actions/actionCreators';
import {editListName} from '../../store/actions/actionCreators';
import {editListOwner} from '../../store/actions/actionCreators';


import {bindActionCreators} from 'redux';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    // handleChange = (e,editionType) => {
    //     const { target } = e;
    //     // this.setState(state => ({
    //     //     ...state,
    //     //     [target.id]: target.value,
    //     // }));
    // }

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
                <Link to="/">
                    <image id="list_trash" onClick={()=>this.props.deleteList(todoList.id)}>&#128465;</image>
                </Link>
                </div>
                
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" value={todoList.name} type="text" name="name" id="name" onChange={(event)=>this.props.editListName(this.props.todoList.id,event.target.value)} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" value={todoList.owner} type="text" name="owner" id="owner" onChange={(event)=>this.props.editListOwner(this.props.todoList.id,event.target.value)}  />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        deleteList: (id)=>{dispatch(deleteList(id))},
        editListName:(x,y)=>{dispatch(editListName(x,y))},
        editListOwner:(x,y)=>{dispatch(editListOwner(x,y))}
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