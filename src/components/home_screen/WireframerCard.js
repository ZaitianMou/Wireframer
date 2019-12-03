import React from 'react';
import {Row,Card, Col} from 'react-materialize';

class WireframerCard extends React.Component {

    render() {
        const { wireframer } = this.props;
        // console.log("TodoListCard, todoList.id: " + wireframer.id);
        return (
            <Row>
                <Col m={12} s={12}>
                    <Card
                    className="grey darken-2"
                    textClassName="white-text"
                    >
                    {wireframer.name}
                    </Card>
                </Col>
            </Row>
        );
    }
}
export default WireframerCard;