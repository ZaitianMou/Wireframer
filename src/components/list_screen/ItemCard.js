import React from 'react';
import { deleteItem } from "../../store/actions/actionCreators";
import { moveItemUp } from "../../store/actions/actionCreators";
import { moveItemDown } from "../../store/actions/actionCreators";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon} from 'react-materialize';



class ItemCard extends React.Component {
    state = {
        name: '',
        owner: '',
    }

    render() {
        const { todoList } = this.props;
        const { item } = this.props;
        const id = this.props.id;
        const index = todoList.items.indexOf(item);
        let statusText = "Completed"
        let colorForText = "blackForStatus"
        if (!item.completed) {
            statusText = "Pending";
            colorForText = "redForStatus";
        }
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">

                <div className="card-content grey-text text-darken-3 grey">
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
                        <div className="btn-floating green">
                            <i className="material-icons">more_horiz</i>
                        </div>

                        <div className="button">
                            <div id="wrapper" >
                                <li><a className="btn-floating green" onClick={(event) => this.moveUp(event, id, todoList, item)}><i className="material-icons">arrow_upward</i></a></li>
                                <li><a className="btn-floating green" onClick={(event) => this.moveDown(event, id, todoList, item)}><i className="material-icons">arrow_downward</i></a></li>
                                <li><a className="btn-floating red" onClick={(event) => this.delete(event, id, todoList, item)}><i className="material-icons">close</i></a></li>
                                <Link to={'/todoList/' + id +'/edit/' + index} id={id} index={index} item={item}>
                                    <li><a className="btn-floating yellow"><i className="material-icons">edit</i></a></li>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Button
                    floating
                    fab={{direction: 'left'}}
                    className="red"
                    >
                    <Button floating icon={<Icon />} className="red" />
                    <Button floating icon={<Icon />} className="yellow darken-1" />
                    <Button floating icon={<Icon />} className="green" />
                    <Button floating icon={<Icon />} className="green" />
                </Button> */}
            </div>
        );
    }
    showEditScreen = (id, index) => {

    }
    moveUp = (event, id, todoList, item) => {
        event.stopPropagation();
        this.props.moveItemUp(id, todoList, item);
    }
    moveDown = (event, id, todoList, item) => {
        event.stopPropagation();
        this.props.moveItemDown(id, todoList, item);
    }
    delete = (event, id, todoList, item) => {
        event.stopPropagation();
        this.props.deleteItem(id, todoList, item);
    }

}



const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (x, y, z) => { dispatch(deleteItem(x, y, z)) },
        moveItemDown: (x, y, z) => { dispatch(moveItemDown(x, y, z)) },
        moveItemUp: (x, y, z) => { dispatch(moveItemUp(x, y, z)) },
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemCard);