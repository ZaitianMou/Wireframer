import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect, actionTypes } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import {getFirebase} from 'react-redux-firebase';
import {Row,Card, Col} from 'react-materialize';
import WireframerCard from './WireframerCard';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    state={
        user:null,
        wireframers:[],
        userID:"0",
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        const users=this.props.users.users;
        const userID=getFirebase().auth().currentUser.uid;
        this.state.userID=userID;
        
        console.log(">>>");
        if (this.props.users.users!=undefined){
            console.log(">")
            console.log(users);
            console.log(userID)
            console.log(users[userID]["wireframers"]);
            this.state.user=users[userID];
            let list=users[userID]["wireframers"];
            function compare(a,b){
                if (a.lastOpened<b.lastOpened){
                    return 1
                }
                else return -1
            }
            list=list.sort(compare);
            this.state.wireframers=list;
            console.log("after sort: >>>");
            console.log(list);
        }

        console.log(this.state.wireframers);

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        {this.state.wireframers.map(wireframer => (
                        <Link to={'/wireframer/' + wireframer.index} key={wireframer.name}>
                            {/* <WireframerCard wireframer={wireframer} /> */}
                           
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
                        {this.state.user!=null && this.state.user.whetherAdministrator? 
                            <div>
                                <Link to="databaseTester">
                                    <button>
                                        databaseTester
                                    </button>
                                </Link>
                            </div>
                        :<div></div>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
    handleAddList=()=>{
        // this.props.addList(this.props.history);
        alert("!");
        const fireStore=getFirestore();
        fireStore.collection("users").doc(this.state.userID).update({
            "wireframers":[...this.state.wireframers,{
					"name": "Unknown",
					"dimension": 100,
					"index":this.state.wireframers.length,
					"controls":[]
            }]
        }).then(x=>{
            //console.log(x.id);
            //this.props.history.push('/wireframer/'+this.state.wireframers.length)
        })
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