import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect, actionTypes } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import {getFirebase} from 'react-redux-firebase';
import {Row,Card, Col} from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import { Button, Modal } from 'react-materialize';
import moveableDemo from './moveableDemo';
import Moveable from "react-moveable";

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
        
        if (this.props.users.users!=undefined){
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
            // console.log("after sort: >>>");
            // console.log(list);
        }

        console.log(this.state.wireframers);

        return (
            <div className="dashboard container">
                <p className="large" id="text_recent_work">
                    Recent work: 
                </p>
                <div className="row">
                    <div className="col s6 m6">
                        {this.state.wireframers.map(wireframer => (
                       
                        <div>
                            <Link to={'/wireframer/' + wireframer.index} key={wireframer.name}>
                                <div className="black-text home_wireframer_link">
                                {wireframer.name}
                                </div>
                            </Link>

                            <Button  href={"#modal"+wireframer.index}   className="modal-trigger red modal_delete_list waves-effect waves-light home_delete_button">
                                <i className="material-icons">clear</i>
                            </Button>
                            <Modal id={"modal"+wireframer.index}  header={"Delete Wireframer: "+wireframer.name+"?"}>
                                Are you sure you would like to delete wireframer:
                                <br></br>
                                <b>Note: it's not undoable.</b>
                                <Link to="/" >
                                    <Button className="submit_button_in_modal red" onClick={()=>{this.handleDeleteWireframer(wireframer)}}>
                                        <i>Yes</i>
                                    </Button>
                                </Link>
                            </Modal>
                        </div>
                ))}
                    </div>

                    <div className="col s6">
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
    handleDeleteWireframer=(wireframer)=>{
        console.log(wireframer.name)
        const fireStore=getFirestore();
        let x=this.state.wireframers;
        let index=x.indexOf(wireframer);
        x.splice(index,1);
        for (let i=index;i<x.length;i++){
            x[i].index=i
        }
        fireStore.collection("users").doc(this.state.userID).update({
            "wireframers":[...x]
        })
    }
    handleAddList=()=>{
        // this.props.addList(this.props.history);
        //alert("!");
        const fireStore=getFirestore();
        fireStore.collection("users").doc(this.state.userID).update({
            "wireframers":[...this.state.wireframers,{
					"name": "Unknown",
					"board_height": 400,
                    "board_width":400,
                    "index":this.state.wireframers.length,
					//"index":this.state.wireframers[this.state.wireframers.length-1].index+1,
					"controls":[]
            }]
        }).then(x=>{
            //console.log(this.state.wireframers[this.state.wireframers.length-1].index);
            let indexOfNewWireframer=this.state.wireframers[this.state.wireframers.length-1].index
            this.props.history.push('/wireframer/'+indexOfNewWireframer)
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