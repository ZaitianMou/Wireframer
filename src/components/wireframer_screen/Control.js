import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirebase, getFirestore } from 'react-redux-firebase';
// import { Platform, StyleSheet, Text, View } from 'react-native';
import Rectangle from 'react-rectangle';

import ResizableRect from 'react-resizable-rotatable-draggable';
class Control extends Component {
    state = {
        element: null,
    }
    render() {
        const element = this.props.element;
        if (element.control_type == "button") {
            return (
                <button style={{ width: "100%", height: "100%" }}> {element.text}</button>

            )
        }
        else if (element.control_type == "label") {
            return (
                <p style={{ width: "100%", height: "100%" }}> {element.text}</p>

            )
        }
        else if (element.control_type == "container") {
            return (
                <Rectangle aspectRatio={[5, 3]}>
                    <div style={{ background: '#607d8b', width: '100%', height: '100%' }} />
                </Rectangle>
            )
        }
        else {
            return (
                <p>
                    nothing
                </p>
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