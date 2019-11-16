import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import {sortItems} from '../../store/actions/actionCreators';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            // <div className="todo-lists section">
            //     <div className="list_item_task_header" onClick={this.sortByItemDescription}>Task</div>
            //     <div className="list_item_due_date_header" onClick={this.sortByItemDueDate}>Due Date</div>
            //     <div className="list_item_status_header" onClick={()=>this.sortByItemCompleted()}>Status</div>
            //     {items && items.map(function(item) {
            //         item.id = item.key;
            //         return (
            //             <ItemCard todoList={todoList} item={item} />
            //         );})
            //     }
            // </div>
           

            <div>
            <table className="highlight">
                <thead >
                    <tr>
                        <th onClick={()=>this.props.sortItems("description",todoList.id,todoList,items,)} width="30%" className="description_header" >Task</th>
                        <th onClick={()=>this.props.sortItems("due_date",todoList.id,todoList,items,)} width="24%" >Due Date</th>
                        <th onClick={()=>this.props.sortItems("completed",todoList.id,todoList,items,)} width="16%" className="status_header">Status</th>
                        <th width="30%" className="tools_header" text-align="left">Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map(function(item) {
                        item.id = item.key;
                        return (
                        <tr>
                            <td colSpan="4">
                            <ItemCard todoList={todoList} item={item} id={todoList.id}/>
                            </td>
                        </tr>
                        );})
                    }
                    </tbody>

            </table>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps=(dispatch)=>{
    return {
        sortItems: (x,y,z,w)=>{dispatch(sortItems(x,y,z,w))},
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);