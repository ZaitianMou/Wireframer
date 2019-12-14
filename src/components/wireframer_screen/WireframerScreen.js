import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirebase, getFirestore } from 'react-redux-firebase';
import DragResizeContainer from 'react-drag-resize';
import Moveable from "react-moveable";
import firebase from "../../config/firebaseConfig";
import ResizableRect from 'react-resizable-rotatable-draggable';
import { Button, Modal } from 'react-materialize';
import Control from './Control';
import { Rnd } from 'react-rnd';

class WireframerScreen extends Component {
    state = {
        wireframer: null,
        wireframers: null,

        index: null,
        userID: '',
        inArrayPosition: -1,
    }

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (this.props.users == undefined)
            return <React.Fragment />

        this.state.index = this.props.match.params.index;
        this.state.userID = getFirebase().auth().currentUser.uid;
        const dt = new Date();
        const x = dt.toUTCString();
        if (this.state.wireframers == null) {

            if (this.props.users.users != undefined) {
                console.log("!!!");
                const user = firebase.firestore().collection("users").doc(this.state.userID);
                user.get().then(doc => {
                    const wireframers = doc.data().wireframers;
                    console.log(">>>")
                    console.log(wireframers)
                    const i = this.props.match.params.index;
                    if (wireframers[i].index == this.state.index) {
                        this.state.wireframer = wireframers[i]
                        this.state.wireframer.lastOpened = dt;
                        this.state.wireframers = wireframers;
                        this.state.inArrayPosition = i;

                        this.state.wireframers[i].lastOpened = x;
                        user.update({
                            wireframers: this.state.wireframers
                        })

                        //if (this.state.wireframer!=undefined){
                        console.log("???????hahahah" + this.state.wireframer.board_width + this.state.wireframer.board_height);
                        document.getElementById("white_board").style.backgroundColor = "red";
                        document.getElementById("white_board").style.width = this.state.wireframer.board_width;
                        document.getElementById("white_board").style.height = this.state.wireframer.board_height;

                    }
                })
            }
        }
        return (
            <div onKeyDown={e => this.keyboardInput(e)} onClick={() => this.unselectElement()}>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" value={this.state.wireframer ? this.state.wireframer.name : null} type="text" name="name"
                        id="name_input_field" onChange={(event) => this.editName(event.target.value)} />
                </div>

                <div className="row outContainer">
                    <div className="col s2">
                        <div className="zoomAndSaveSection">
                            <i className="material-icons">zoom_in</i>
                            <i className="material-icons">zoom_out</i>
                            <div className="input-field">
                                <label htmlFor="email" className="active">board width:</label>
                                <input className="active dimension_input_field" value={this.state.wireframer ? this.state.wireframer.board_width : null} type="text" name="name"
                                    onChange={(event) => this.changeDimension(event.target.value, "width")} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="email" className="active">board height:</label>
                                <input className="active dimension_input_field" value={this.state.wireframer ? this.state.wireframer.board_height : null} type="text" name="name"
                                    onChange={(event) => this.changeDimension(event.target.value, "height")} />
                            </div>

                            <p className="save_button" onClick={() => this.saveWork(this.state.wireframer.controls)} >Save</p>
                            <p className="close_button" className={"modal-trigger"} href={"#modalWhenClose"} >Close</p>
                            <Modal id="modalWhenClose" header={"Want to save your work before leave?"}>
                                <Link to="/" ><Button className="submit_button_in_modal" onClick={() => { this.saveWork() }}>
                                    <i>Save</i>
                                </Button></Link>
                                <Link to="/"><Button className="red">
                                    Don't save.
                                </Button></Link>
                            </Modal>
                        </div>
                        <div className="divider"></div>
                        <div className="add_element_section">


                            <div onClick={() => this.createAContainer()} className="add_element_icon">
                                <p>Container</p>
                            </div>
                            <div onClick={() => this.createALabel()} className="add_element_icon">
                                <p>Prompt for input</p>
                                <p>Label</p>
                            </div>

                            <div onClick={() => this.createAButton()} className="add_element_icon">
                                <button disabled={true}>Submit</button>
                                <p>Button</p>
                            </div>
                            <div onClick={() => this.createATextfield()} className="add_element_icon">
                                <i className="material-icons">text_fields</i>

                                <p>Textfield</p>
                            </div>

                        </div>

                    </div>
                    <div className="col s7">
                        <div id="white_board">

                            {this.state.wireframer && this.state.wireframer.controls.map((element, index) => (

                                <div onClick={(e) => this.selectElement(index, e)}>
                                    <Rnd
                                        size={{ width: element.width, height: element.height }}
                                        position={{ x: element.left, y: element.top }}
                                        onDragStop={(e, d) => {
                                            let temp = this.state.wireframer;
                                            temp.controls[index].top = d.y;
                                            temp.controls[index].left = d.x;
                                            this.setState({
                                                wireframer: temp
                                            })
                                        }}
                                        onResizeStop={(e, direction, ref, delta, position) => {
                                            let temp = this.state.wireframer;
                                            temp.controls[index].width = ref.style.width;
                                            temp.controls[index].height = ref.style.height;
                                            this.setState({
                                                wireframer: temp
                                            })

                                        }}
                                    >
                                        <Control element={element} />

                                    </Rnd>
                                </div>
                            ))}
                        </div>

                    </div>


                    <div className="col s3">


                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }
    onKeyPressed(e) {
        if (this.state.elementSelected != null) {
            if (e.key === 'd' && e.ctrlKey) {
                console.log("Ctrl+D detected. Duplicate element: "+this.state.elementSelected);
                let temp = this.state.wireframer;
                let e=temp.controls[this.state.elementSelected]
                let e2=JSON.parse(JSON.stringify(e));
                e2.index=this.state.wireframer.controls.length;
                e2.top=e.top-100;
                e2.left=e.left-100;
                temp.controls.push(e2);

                this.setState({
                    wireframer: temp
                })
            }
            if (e.key === "Backspace") {
                console.log("DELETE detected. Delete element: "+this.state.elementSelected)
                let temp = this.state.wireframer;
                
                temp.controls.splice(this.state.elementSelected,1);
                for (let i=this.state.elementSelected;i<temp.controls.length;i++){
                    temp.controls[i].index=i
                }
                this.setState({
                    wireframer: temp
                })
            }
        }
    }
    selectElement = (index, event) => {
        document.getElementById("white_board")
        event.stopPropagation();
        this.setState({
            elementSelected: index
        })
        console.log(index)
        //alert("selected:"+this.state.elementSelected)
    }
    unselectElement = () => {
        this.setState({
            elementSelected: null
        })
    }
    keyboardInput = (e) => {
        alert(this.state.elementSelected);
        if (e.key === 'd' && e.ctrlKey) {
            alert("")
        }
        else if (e.deleteKey) {
            alert("")
        }
    }
    // handleDrag = (deltaX, deltaY) => {
    //     let temp=this.state.wireframer;
    //     temp.controls[0].left=temp.controls[0].left+deltaX;
    //     temp.controls[0].top=temp.controls[0].top+deltaY;
    //      this.setState(
    //        { wireframer:temp,}
    //     );
    //   }

    handleResize = (style, isShiftKey, type, element) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)

        let temp = this.state.wireframer;

        temp.controls[element.index].top = top;
        temp.controls[element.index].height = height;
        temp.controls[element.index].left = left;
        temp.controls[element.index].width = width;
        this.setState({
            wireframer: temp,
        })
    }
    editName = (value) => {
        let t = this.state.wireframers;
        t[this.state.index].name = value;
        this.setState({
            wireframers: t
        })
    }
    changeDimension = (value, type) => {
        let t = this.state.wireframers;
        if (value == "") { value = 0; }
        if (type == "width") {
            t[this.state.index].board_width = parseInt(value);
        }
        else if (type == "height") {
            t[this.state.index].board_height = parseInt(value);
        }
        else {
            alert("WTF!!! It's not supposed to happen!!!")
        }
        this.setState({
            wireframers: t
        })
    }


    getLeft = () => {
    }
    handleSelected = () => {
    }
    saveWork = (controls) => {
        let userRef = firebase.firestore().collection("users").doc(this.state.userID)
        let x = this.state.wireframers;
        x[this.state.inArrayPosition] = this.state.wireframer;
        userRef.update({
            "wireframers": x
        })

        alert("Saved");
    }

    createAButton = () => {
        let temp = this.state.wireframer;
        temp.controls.push({
            "control_type": "button",
            "index": temp.controls.length,
            "top": 0,
            "left": 0,
            "width": 50,
            "height": 20,
            "text": "This is a button.",
            "text_font_size": 12,
            "color": "white",
            "border": 2
        })
        this.setState({
            wireframer: temp
        })
    }
    createALabel = () => {
        let temp = this.state.wireframer;
        temp.controls.push({
            "control_type": "label",
            "index": temp.controls.length,
            "top": 0,
            "left": 0,
            "width": 50,
            "height": 20,
            "text": "This is a Label.",
            "text_font_size": 12,
            "color": "white",
            "border": 2
        })
        this.setState({
            wireframer: temp
        })
    }
    createATextfield = () => {
        let temp = this.state.wireframer;
        temp.controls.push({
            "control_type": "textfield",
            "index": temp.controls.length,
            "top": 0,
            "left": 0,
            "width": 50,
            "height": 20,
            "text": "This is a textfield.",
            "text_font_size": 12,
            "color": "white",
            "border": 2
        })
        this.setState({
            wireframer: temp
        })
    }
    createAContainer = () => {
        let temp = this.state.wireframer;
        temp.controls.push({
            "control_type": "container",
            "index": temp.controls.length,
            "top": 0,
            "left": 0,
            "width": 50,
            "height": 20,
            "text": "This is a container.",
            "text_font_size": 12,
            "color": "white",
            "border": 2
        })
        this.setState({
            wireframer: temp
        })
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
        auth: state.firebase.auth,
        users: state.firestore.data,
        profile: state.firebase.profile,
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(WireframerScreen);