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
        //i added to clear first
        const firestore = getFirestore();
        wireframeJson.users.forEach(user=>{
            firebase.auth().createUserWithEmailAndPassword(
                user.email,
                "111111"
            ).then(resp => firestore.collection('users').doc(resp.user.uid).set(user))
            .catch((err) => {
                console.log(err);
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
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}
const mapDispatchToProps = dispatch => ({
    register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
  });

export default connect(mapStateToProps,mapDispatchToProps)(DatabaseTester);