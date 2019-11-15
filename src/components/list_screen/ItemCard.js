import React from 'react';
import { Button } from 'react-materialize';
import Delete from '../../images/delete.png';
import MoveDown from '../../images/MoveDown.png'
import MoveUp from '../../images/MoveUp.png';
//import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';



class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
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
                    <div className='list_item_card_due_date'>
                        {item.due_date}
                    </div>
                    <div className='list_item_card_completed' >
                        <p className={colorForText}>
                        {statusText}
                        </p>
                    </div>
                </div>

                {/* <div className="fabButton">
                    <Button
                        floating
                        fab={{ direction: 'left' }}
                        className="fabButton"
                        large
                    >
                        <Button floating className="red" />
                        <Button floating className="yellow darken-1" />
                        <Button floating className="item_delete_button" icon={Delete} />
                    </Button>
                </div> */}
                <div className="small-4 columns toolbar">
                    <div className="fab">
                        <div className="btn-floating btn-small red ">
                            
                            <i className="large material-icons">mode_edit</i>
                        </div>
                    
                        <div className="button">
                        <div id="wrapper" >
                            <li><a className="btn-floating green"><i className="material-icons">arrow_upward</i></a></li>
                            <li><a className="btn-floating green"><i className="material-icons">arrow_downward</i></a></li>
                            <li><a className="btn-floating red"><i className="material-icons">close</i></a></li>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;