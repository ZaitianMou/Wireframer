import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './TestWireframeData.json'
import { getFirestore } from 'redux-firestore';
import { registerHandler } from '../store/database/asynchHandler';
import firebase from '../config/firebaseConfig';
class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('users').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        // if (firebase.auth().currentUser!=undefined)
        //     firebase.auth().currentUser.delete().then().catch((err)=>console.log(err));
        //i added to clear first
        const firestore = getFirestore();
        wireframeJson.users.forEach(user=>{

            firebase.auth().createUserWithEmailAndPassword(
                user.email,
                "111111"
            )
            .then(resp => {
                console.log("Create user authentication: "+user.email)
                firestore.collection('users').doc(resp.user.uid).set(user);
                console.log("Add data for user "+resp.user.uid);
            })
            .catch((err) => {
                console.log(err);
                firestore.collection('users').doc(firebase.auth().currentUser.uid).set(user);
                console.log("But still add data for the existing user. Need to manully set it as Administrator")
            });
        });
        
        // wireframeJson.users.forEach(user => {
        //     fireStore.collection('users').add(user).then(() => {
        //             console.log("DATABASE RESET");
        //             // add a authentication account
        //             firebase.auth().createUserWithEmailAndPassword(
        //                 user.email,
        //                 "111111"
        //             )
        //                 // const newUser={
        //                 //     email: user.email,
        //                 //     password: '111111',
        //                 //     firstName: user.first_name,
        //                 //     lastName: user.last_name,
        //                 //     initials: user.initials,
        //                 //   };
        //                 // this.props.register(newUser, firebase);
                    
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        // });

    }

    render() {
        //this.props.users.users[this.props.auth.currentUser.uid].whetherAdministrator==true
        // if (this.props.auth.currentUser==undefined){
        //     return (
        //         <p>
        //             Please log in to use the databaseTester
        //         </p>
        //    )
        // }
        // else return (
            return (
            <div>
                <div>
                    <button onClick={this.handleClear}>Clear Database</button>
                    <button onClick={this.handleReset}>Reset Database</button>
                </div>
            </div>
            )
        // )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        users: state.firestore.data,
        firebase: state.firebase
    };
}
const mapDispatchToProps = dispatch => ({
    register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
  });

export default connect(mapStateToProps,mapDispatchToProps)(DatabaseTester);