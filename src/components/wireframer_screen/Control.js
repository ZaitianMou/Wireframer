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
                <button style={{ display: "inline-block",width: "100%", height: "100%", fontSize: `${element.text_font_size}px`, borderRadius: `${element.border_radius}px`, borderWidth: `${element.border_thickness}px` }}> {element.text}</button>

            )
        }
        else if (element.control_type == "label") {
            return (
                <div style={{ width: "100%", height: "100%", fontSize: `${element.text_font_size}px`, borderRadius: `${element.border_radius}px`, borderWidth: `${element.border_thickness}px`,borderStyle: "ridge" }}> 
                {element.text}
                </div>
            )
        }
        else if (element.control_type == "container") {
            return (
                <Rectangle aspectRatio={[5, 3]}>
                    <div style={{ background: '#607d8b', width: '100%', height: '100%', borderRadius: `${element.border_radius}px`, borderWidth: `${element.border_thickness}px`, borderStyle:"ridge"}}/>
                </Rectangle>
            )
        }
        else if (element.control_type == "textfield") {
            return (
                <input value={element.text} style={{ fontSize: `${element.text_font_size}px`, borderRadius: `${element.border_radius}px`, borderWidth: `${element.border_thickness}px`,borderStyle: "ridge" }}>
                </input>
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