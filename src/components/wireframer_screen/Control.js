import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {getFirebase ,getFirestore} from 'react-redux-firebase';

import ResizableRect from 'react-resizable-rotatable-draggable';
class Control extends Component {
    state={
        element:null,
    }
    render() {
        const element=this.props.element;
        if (element.control_type=="button"){
            return(
                <div>
                    <button> {element.text}</button>
                    
                </div>

            )
        }
        else if(element.control_type=="label"){
            return (
            <p> {element.text}</p>
            )
        }
        else{
            return (
                <p>nothing was returned</p>
            )
        }
    }
}


export default Control;
// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect([
//         { collection: 'users' },
//     ]),
// )(Control);