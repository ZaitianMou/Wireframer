import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';

import {deleteList} from '../../store/actions/actionCreators';
import {editListName} from '../../store/actions/actionCreators';
import {editListOwner} from '../../store/actions/actionCreators';
import {addItem} from '../../store/actions/actionCreators';
import { Button,Icon,Modal} from 'react-materialize';

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
        
        const dt=new Date();
        const x=dt.toUTCString();

        const fireStore=getFirestore();
        fireStore.collection('todoLists').doc(todoList.id).update({
            'lastOpened': {x}
        });
        return (
            <div className="container white">
                <div>
                <h5 className="grey-text text-darken-3">Todo List</h5>
                {/* <Link to="/">
                    <image id="list_trash" onClick={()=>this.props.deleteList(todoList.id)}>&#128465;</image>
                </Link> */}
                <div>
                <Button href="#modal1" className="modal-trigger red modal_delete_list">
                    <i className="material-icons">delete_forever</i>
                </Button>
               
                
                <Modal id="modal1" header="Delete List?">
                        Are you sure you would like to delete the list????
                        <br></br>
                        <b>Note: it's not undoable.</b>
                        <Link to="/" >
                        <Button className="submit_button_in_modal red" onClick={()=>this.props.deleteList(todoList.id)}>
                            <i>Yes</i>
                        </Button>
                        </Link>
                </Modal>
                </div>

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
                
                <div>
                    <Button
                    floating
                    large
                    waves="light"
                    onClick={()=>this.props.addItem(this.props.todoList.id,this.props.todoList)}
                    icon={<Icon />}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        deleteList: (id)=>{dispatch(deleteList(id))},
        editListName:(x,y)=>{dispatch(editListName(x,y))},
        editListOwner:(x,y)=>{dispatch(editListOwner(x,y))},
        addItem:(id,y)=>{dispatch(addItem(id,y))}
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