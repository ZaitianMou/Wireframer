import React, { Component } from 'react';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class ItemScreen extends Component {
    
    state = {
        name: '',
        owner: '',
    }

    render() {
        console.log(">>>>>");
        const index= this.props.match.params.index;
        const id=this.props.match.params.id;
       
        //const item=this.props.item;

        console.log(id);
        console.log(index);
        
        if (index >= 0) {
            const fireStore=getFirestore();
            fireStore.collection('todoLists').doc(id).get().then(doc=>{
                const data=doc.data().items;
                console.log(doc);
                console.log(data);
                
                window.item=data;
            })
            var des=window.item[index].description;
            var ass=window.item[index].assigned_to;
            var due=window.item[index].due_date;
            var com=window.item[index].completed;
        }
        else {
            var des = "";
            var ass = "";
            var due = "";
            var com = "";
        }
        console.log(des+".."+ass+".."+due+".."+com)
        return (
            <div id="item_edit_screen" >
                Item<br></br>

                <p id="item_description_prompt">Description:</p>  <input type="text" name="Description" id="newDescription" defaultValue={des} />
                <p id="item_assigned_to_prompt">Assigned To: </p> <input type="text" name="AssignedTo" id="newAssignedTo" defaultValue={ass} />
                <p id="item_due_date_prompt">Due Date:</p>  <input type="date" name="DueDate" id="newDueDate" defaultValue={due} />
                
                <p id="item_completed_prompt">Completed: </p> <input type="checkbox" class="filled-in" checked="checked" id="newCompleted" defaultChecked={com} />
                <button id="item_edit_screen_submit_button" className="button" onClick={this.handleSubmit}>Submit</button>
                <button id="item_edit_screen_cancel_button" className="button" onClick={this.handleCancel}>Cancel</button>
            </div>
        )

    }
}






const mapDispatchToProps=(dispatch)=>{
    return {
        //deleteItem:(x,y,z)=>{dispatch(deleteItem(x,y,z))},
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
  )(ItemScreen);