import React, { Component } from 'react';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import { Checkbox } from 'react-materialize';

class ItemScreen extends Component {

    state = {
        name: '',
        owner: '',
    }

    render() {
        const index = this.props.match.params.index;
        const id = this.props.match.params.id;
        if (index >= 0) {
            var des = this.props.todoList.items[index].description
            var ass = this.props.todoList.items[index].assigned_to;
            var due = this.props.todoList.items[index].due_date;
            var com = this.props.todoList.items[index].completed;
        }
        else {
            var des = "";
            var ass = "";
            var due = "";
            var com = "";
        }
        return (
            <div>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <p id="item_description_prompt">Description:</p>
                            <input type="text" name="Description" id="newDescription" defaultValue={des} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <p id="item_assigned_to_prompt">Assigned To: </p>
                            <input type="text" name="AssignedTo" id="newAssignedTo" defaultValue={ass} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <p id="item_due_date_prompt">Due Date:</p>
                            <input type="date" name="DueDate" id="newDueDate" defaultValue={due} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <p id="item_completed_prompt">Completed: </p>
                            <br></br>
                            <Checkbox  id="newCompleted" onChange={()=>com=!com}/>
                            {/* <input type="checkbox" className="filled-in" checked="checked" id="newCompleted" defaultChecked={com} /> */}
                        </div>
                    </div>

                </form>
                <Link to={"/todoList/" + id}>
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={() => this.editItem(id, index)}>Submit
                        <i className="material-icons right">send</i>
                    </button>
                </Link>
                <Link to={"/todoList/" + id}>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Cancel
                        <i className="material-icons right"></i>
                    </button>
                </Link>
            </div>
        )
    }
    editItem = (id, index) => {

        var newDescription = document.getElementById("newDescription").value;
        var newAssignedTo = document.getElementById("newAssignedTo").value;
        var newDueDate = document.getElementById("newDueDate").value;
        var newCompleted = document.getElementById("newCompleted").checked;

        if (index >= 0) {
            //when editting item
            const fireStore = getFirestore();
            const todoList = fireStore.collection("todoLists").doc(id);
            todoList.get().then(doc => {
                const data = doc.data().items;
                data[index].description = newDescription;
                data[index].assigned_to = newAssignedTo;
                data[index].due_date = newDueDate;
                data[index].completed = newCompleted;

                todoList.update({
                    "items": [...data]
                })
            });
        }
        else {
            //when creating new item
            const fireStore = getFirestore();
            const todoList = fireStore.collection("todoLists").doc(id);
            todoList.get().then(doc => {
                const data = doc.data().items;
                data.push({
                    'description': newDescription,
                    'assigned_to': newAssignedTo,
                    'due_date': newDueDate,
                    'completed': newCompleted
                })
                todoList.update({
                    "items": [...data]
                })
            });

        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //deleteItem:(x,y,z)=>{dispatch(deleteItem(x,y,z))},
    }
}
const mapStateToProps = (state, ownProps) => {

    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    if (todoList)
        todoList.id = id;

    return {
        todoList: todoLists[id],
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);