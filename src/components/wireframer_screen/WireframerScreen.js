import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';
import DragResizeContainer from 'react-drag-resize';
import Moveable from "react-moveable";

class WireframerScreen extends Component {
    state = {
        name: '',
        owner: '',
    }
    render() {
        
        const layout = [{ key: 'test', x: 0, y: 0, width: 200, height: 100, zIndex: 1 }]
        const canResizable = (isResize) => {
            return { top: isResize, right: isResize, bottom: isResize, left: isResize, topRight: isResize, bottomRight: isResize, bottomLeft: isResize, topLeft: isResize };
        };

        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        const index=this.props.match.params.index;
        console.log("index in wireframerScreen "+index);
        // if (!todoList)
        //     return <React.Fragment />
        // const dt = new Date();
        // const x = dt.toUTCString();
        // const fireStore = getFirestore();
        // // fireStore.collection('todoLists').doc(todoList.id).update({
        //     'lastOpened': { x }
        // });
        return (
            <div>
                <div className="row outContainer">
                    <div className="col s2">
                        <div className="zoomAndSaveSection">
                            <i className="material-icons">zoom_in</i>
                            <i className="material-icons">zoom_out</i>
                            <p className="save_button" onClick={() => console.log("Save")}>Save</p>
                            <p className="close_button" onClick={() => console.log("Cancel")}>Close</p>
                        </div>
                        <div className="divider"></div>
                        <div className="add_element_section">

                            <p>Container</p>
                            <p>Prompt for input</p>
                            <p>Label</p>

                            <button>Submit</button>
                            <p>Button</p>

                            <i className="material-icons">text_fields</i>
                            <p>Textfield</p>

                        </div>

                    </div>
                    <div className="col s7">
                        {/* <DragResizeContainer
                            className='resize-container'
                            resizeProps={{
                                minWidth: 10,
                                minHeight: 10,
                                enable: canResizable(isResize)
                            }}
                            onDoubleClick={()=>alert("click!!!")}
                            layout={layout}
                            dragProps={{ disabled: false }}
                            onLayoutChange={()=>alert("layerout change!!!")}
                            scale={scale}
                        >
                        {layout.map((single) => {
                            return (
                                <div key={single.key} className='child-container size-auto border'>text test</div>
                            );
                        })}
                        ></DragResizeContainer> */}
                    
                        <p className="resizeable">
                            yoooooo!
                        </p>
                       
                         {/* <Moveable
                            target={document.querySelector(".resizable")}
                            resizable={true}
                            throttleResize={0}
                            keepRatio={true}
                            onResize={({ target, width, height, dist }) => {
                                console.log(width, height, dist);
                                target.style.width = width + "px";
                                target.style.height = height + "px";
                            }}
                        /> */}
                    </div>
                    <div className="col s3">


                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //     deleteList: (id) => { dispatch(deleteList(id)) },
    }
}


const mapStateToProps = (state, ownProps) => {

    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    if (todoList)
        todoList.id = id;


    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(WireframerScreen);