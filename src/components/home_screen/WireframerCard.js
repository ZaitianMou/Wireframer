import React from 'react';
import {Row,Card, Col} from 'react-materialize';

class WireframerCard extends React.Component {

    render() {
        const { wireframer } = this.props;
        console.log("wireframer");
        console.log("WireframerCard, wireframer.name: " + wireframer.name);
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