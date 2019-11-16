import React from 'react';
import {deleteItem} from "../../store/actions/actionCreators";
import {moveItemUp} from "../../store/actions/actionCreators";
import {moveItemDown} from "../../store/actions/actionCreators";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
//import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';



class ItemCard extends React.Component {
    state = {
        name: '',
        owner: '',
    }
    render() {
        const {todoList} =this.props;
        const { item } = this.props;
        const id=this.props.id;
        let statusText = "Completed"
        let colorForText="blackForStatus"
        if (!item.completed) {
            statusText = "Pending";
            colorForText="redForStatus";
        }
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">

                <div className="card-content grey-text text-darken-3">
                    {/* <span className="card-title">{item.description}</span>
                    <span className="card-title">{item.due_date}</span> */}
                    <div className='list_item_card_description'>
                        {item.description}
                    </div>
                    <div className='list_item_card_assigned_to'>
                        <b>Assigned to:</b>
                        {item.assigned_to}
                    </div>
                    <div className='list_item_card_due_date'>
                        {item.due_date}
                    </div>
                    <div className='list_item_card_completed' >
                        <p className={colorForText}>
                        {statusText}
                        </p>
                    </div>
                </div>
                <div className="small-4 columns toolbar">
                    <div className="fab">
                        <div className="btn-floating red ">
                            <i className="material-icons">mode_edit</i>
                        </div>
                    
                        <div className="button">
                        <div id="wrapper" >
                            <li><a className="btn-floating green" onClick={()=>this.props.moveItemUp(id,todoList,item)}><i className="material-icons">arrow_upward</i></a></li>
                            <li><a className="btn-floating green" onClick={()=>this.props.moveItemDown(id,todoList,item)}><i className="material-icons">arrow_downward</i></a></li>
                            <li><a className="btn-floating red" onClick={()=>this.props.deleteItem(id,todoList,item)}><i className="material-icons">close</i></a></li>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        deleteItem:(x,y,z)=>{dispatch(deleteItem(x,y,z))},
        moveItemDown:(x,y,z)=>{dispatch(moveItemDown(x,y,z))},
        moveItemUp:(x,y,z)=>{dispatch(moveItemUp(x,y,z))},
    }
}
  
  export default compose(
    connect(null,mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemCard);