import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import {getFirebase ,getFirestore} from 'react-redux-firebase';
import {Row,Card, Col} from 'react-materialize';
import WireframerCard from './WireframerCard';

class HomeScreen extends Component {

    state={
        wireframers:[]
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        const users=this.props.users.users;
        const userID=getFirebase().auth().currentUser.uid;
        
        console.log(">>>");
        if (this.props.users.users!=undefined){
            console.log(">")
            console.log(users);
            console.log(userID)
            console.log(users[userID]["wireframers"]);
            this.state.wireframers=users[userID]["wireframers"]
        }
        console.log(this.state.wireframers);
        let index=0;
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        {this.state.wireframers.map(wireframer => (
                        <Link to={'/wireframer/' + index} key={wireframer.name}>
                            {/* <WireframerCard wireframer={wireframer} /> */}
                            {index=index+1}
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
                        </Link>
                ))}
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframers<br />
                        </div>
                        
                        <div className="home_new_list_container">
                            {/*  path below should be similiar with that/todoList"+todoLists[0].id */}
                                <Link  to="/" className="home_new_list_button"  />
                                    <button className="home_new_list_button" onClick={this.handleAddList}  >
                                        Create a New Wireframer
                                    </button>
                                <Link />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleAddList=()=>{
        this.props.addList(this.props.history);
    }
   
}

const mapDispatchToProps=(dispatch)=>{
    return {
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.data
    };
};

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
      { collection: 'users'}
    ]), // to sort: add below " orderBy: ['lastOpened','desc'] "into firestoreConnect
)(HomeScreen);