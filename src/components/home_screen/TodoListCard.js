import React from 'react';
import {Row,Card, Col} from 'react-materialize';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            // <div className="card z-depth-0 todo-list-link">
            //     <div className="card-content grey-text text-darken-3">
            //         <span className="card-title">{todoList.name}</span>
            //     </div>
            // </div>
            <Row>
                <Col m={12} s={12}>
                    <Card
                    className="grey darken-2"
                    textClassName="white-text"
                    >
                    {todoList.name}
                    </Card>
                </Col>
            </Row>
        );
    }
}
export default TodoListCard;