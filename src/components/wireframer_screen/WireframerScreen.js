import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirebase, getFirestore } from 'react-redux-firebase';
import firebase from "../../config/firebaseConfig";
import { Button, Modal } from 'react-materialize';
import Control from './Control';
import { Rnd } from 'react-rnd';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';
import Rectangle from 'react-rectangle';

class WireframerScreen extends Component {
    state = {
        wireframer: null,
        wireframers: null,

        index: null,
        userID: '',
        inArrayPosition: -1, //position of currne wireframer in wireframers
        displayColorPicker: false,
        scale: 1
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


                    }
                })
            }
        }

        return (
            <div>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" value={this.state.wireframer ? this.state.wireframer.name : null} type="text" name="name"
                        id="name_input_field" onChange={(event) => this.editName(event.target.value)} />
                </div>


                <div className="row outContainer">
                    <div className="col s2">
                        <div className="saveSection">

                            <p className="save_button" onClick={() => this.saveWork(this.state.wireframer.controls)} >Save</p>
                            <p className="close_button modal-trigger" href={"#modalWhenClose"} >Close</p>
                        </div>

                        <div className="zoomAndDimensionSection">
                            <i className="material-icons" id="zoom_in_button" onClick={() => this.zoomIn()}>zoom_in</i>
                            <i className="material-icons" id="zoom_out_button" onClick={() => this.zoomOut()}>zoom_out</i>
                            <p style={{ margin: '0' }}>Current: {this.state.scale}X</p>
                            <div className="input-field">
                                <label htmlFor="email" className="active">board width:</label>
                                <input className="active dimension_input_field" defaultValue={this.state.wireframer ? this.state.wireframer.board_width : null} type="number" name="name" min="1" max="5000"
                                    id="dimension_width_input" onChange={() => document.getElementById("button_update_dimension").disabled = false} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="email" className="active">board height:</label>
                                <input className="active dimension_input_field" defaultValue={this.state.wireframer ? this.state.wireframer.board_height : null} type="number" name="name" min="1" max="5000"
                                    id="dimension_height_input" onChange={() => document.getElementById("button_update_dimension").disabled = false} />
                            </div>
                            <p id="button_update_dimension" onClick={() => this.updateDimension()}>Update</p>

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
                            <p>
                                Click to add element.
                            </p>
                            <div onClick={() => this.createAContainer()} style={{ textAlign: 'center', borderStyle: "solid", borderWidth: '2px', width: "80%", borderRadius: '1px' }} className="add_element_icon">
                                <Rectangle aspectRatio={[5, 4]}>
                                    <div style={{ alignContent: "center" }} >
                                        Container
                                </div>
                                </Rectangle>
                            </div>
                            <div onClick={() => this.createALabel()} className="add_element_icon">
                                <p>Label</p>
                            </div>

                            <div >
                                <button onClick={() => this.createAButton()} className="add_element_icon">Button</button>

                            </div>
                            <div className="add_element_icon">
                                <input value="Textfield" onClick={() => this.createATextfield()} ></input>
                            </div>

                        </div>

                    </div>

                    <div>
                        <div className="col s7" id="white_board"
                            onClick={() => this.unselectElement()} style={this.state.wireframer ? { height: this.state.wireframer.board_height, width: this.state.wireframer.board_width, transform: 'scale(' + this.state.scale + ')' } : {}}>

                            {this.state.wireframer && this.state.wireframer.controls.map((element, index) => (

                                <div onClick={(e) => this.selectElement(index, e)} >
                                    <Rnd id={"control" + index}
                                        size={{ width: parseInt(element.width), height: parseInt(element.height) }}
                                        position={{
                                            x: element.left < 0 ? 0 : (element.left > this.state.wireframer.board_width - parseInt(element.width, 10) ? this.state.wireframer.board_width - parseInt(element.width, 10) : element.left),
                                            y: this.getTop(element.top, parseInt(element.height))
                                        }}
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


                    <div className="col s3" id="property_section">
                        <p>Properties</p>

                        <div className="input-field">
                            <label htmlFor="email" className="active">Text</label>
                            <input className="active" value={this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].text : null}
                                type="text" name="name" id="text_input" onChange={(event) => this.changeProperty("text", event.target.value)} />
                        </div>

                        <div className="input-field">
                            <label htmlFor="email" className="active">Font size</label>
                            <input className="active" value={this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].text_font_size : null}
                                type="text" name="name" id="font_size_input" onChange={(event) => this.changeProperty("text_font_size", event.target.value)} />
                        </div>
                        <p>Background Color</p>
                        <input value={this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].background_color : null}
                        type="color" name="background_color" onChange={(event)=>this.changeProperty("background_color",event.target.value)}></input>
                        
                        <p>border color </p>
                        <input value={this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].border_color : null}
                        type="color" name="border_color" onChange={(event)=>this.changeProperty("border_color",event.target.value)}></input>

                        <p>Text color</p>
                        <input value={this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].text_color : null}
                        type="color" name="text_color"  onChange={(event)=>this.changeProperty("text_color",event.target.value)}></input>
{/* 
                        <div>
                            <div style={{
                                padding: '5px',
                                background: '#fff',
                                borderRadius: '1px',
                                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                display: 'inline-block',
                                cursor: 'pointer',
                            }} onClick={this.handleClick}>
                                <div style={{
                                    width: '36px',
                                    height: '14px',
                                    borderRadius: '2px',
                                    background: `rgba(${this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].color.r : null}, ${this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].color.g : null}, 
                                    ${this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].color.b : null}, ${this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].color.a : null} :{})`,
                                }} />
                            </div>
                            {this.state.displayColorPicker ? <div style={{
                                position: 'absolute',
                                zIndex: '2',
                            }}>
                                <div style={{
                                    position: 'fixed',
                                    top: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                    left: '0px',
                                }} onClick={this.handleClose} />

                                <SketchPicker color={this.getColor()} onChange={this.handleChange} />
                            </div> : null}

                        </div> */}


                        <div className="input-field">
                            <label htmlFor="email" className="active">Board thickness</label>
                            <input className="active" value={this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].border_thickness : null}
                                type="range" name="points" min="1" max="20" id="board_thickness_input" onChange={(event) => this.changeProperty("border_thickness", event.target.value)} />
                        </div>

                        <div className="input-field">
                            <label htmlFor="email" className="active">Board radius</label>
                            <input className="active" value={this.state.wireframer && this.state.elementSelected ? this.state.wireframer.controls[this.state.elementSelected].border_radius : null}
                                type="range" name="points" min="1" max="100" id="board_radius_input" onChange={(event) => this.changeProperty("border_radius", event.target.value)} />
                        </div>



                    </div>
                </div>
            </div>
        );
    }
    zoomIn = () => {
        let t = this.state.scale;
        this.setState({
            scale: t * 2
        })
        console.log("Now the scale is:" + this.state.scale)
    }
    zoomOut = () => {
        let t = this.state.scale;
        this.setState({
            scale: t / 2
        })
        console.log("Now the scale is:" + this.state.scale)
    }
    getTop(top, height) {
        height = parseInt(height, 10);
        if (top < 0)
            return 0;
        else if (top > this.state.wireframer.board_height - height)
            return this.state.wireframer.board_height - height;
        else return top;
    }
    getLeft(left, width) {
        width = parseInt(width, 10);
        if (left < 0)
            return 0;
        else if (left > this.state.wireframer.board_width - width)
            return this.state.wireframer.board_width - width;
        else return left;
    }

    changeProperty = (type, value) => {
        console.log(value)
        if (this.state.elementSelected == null)
            return null
        let temp = this.state.wireframer;
        switch (type) {
            case "text": temp.controls[this.state.elementSelected].text = value; break;
            case "text_font_size": temp.controls[this.state.elementSelected].text_font_size = parseInt(value); break;
            case "border_thickness": temp.controls[this.state.elementSelected].border_thickness = parseInt(value); break;
            case "border_radius": temp.controls[this.state.elementSelected].border_radius = parseInt(value); break;
            case "background_color": temp.controls[this.state.elementSelected].background_color=value; break;
            case "border_color":temp.controls[this.state.elementSelected].border_color=value; break;
            case "text_color": temp.controls[this.state.elementSelected].text_color=value; break;

        }
        this.setState({
            wireframer: temp
        })

    }
    getColor = () => {
        alert("ready")
        if (this.state.wireframer && this.state.elementSelected) {
            return this.state.wireframer.controls[this.state.elementSelected].color;
        }
        else {
            alert("NOT ok")
            return null
        }
    }
    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        let temp = this.state.wireframer;
        temp.controls[this.state.elementSelected].color = color
        this.setState({ wireframers: temp })
    };

    updateDimension = (value, type) => {
        let width = parseInt(document.getElementById("dimension_width_input").value);
        let height = parseInt(document.getElementById("dimension_height_input").value);
        let t = this.state.wireframers;

        if (!(width >= 1 && width <= 5000)) {
            alert("Input Invalid.")
            return null
        }
        if (!(height >= 1 && height <= 5000)) {
            alert("Input Invalid.")
            return null
        }
        t[this.state.index].board_width = width
        t[this.state.index].board_height = height
        this.setState({
            wireframers: t
        })

        document.getElementById("button_update_dimension").disabled = true

    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }
    onKeyPressed(e) {
        if (this.state.elementSelected != null) {
            if (e.key === 'd' && e.ctrlKey) {
                console.log("Ctrl+D detected. Duplicate element: " + this.state.elementSelected);
                let temp = this.state.wireframer;
                let e = temp.controls[this.state.elementSelected]
                let e2 = JSON.parse(JSON.stringify(e));
                e2.index = this.state.wireframer.controls.length;
                e2.top = e.top - 100;
                e2.left = e.left - 100;
                temp.controls.push(e2);

                this.setState({
                    wireframer: temp
                })
            }
            if (e.key === "Backspace" && e.ctrlKey) {
                console.log("DELETE detected. Delete element: " + this.state.elementSelected)
                let temp = this.state.wireframer;

                temp.controls.splice(this.state.elementSelected, 1);
                for (let i = this.state.elementSelected; i < temp.controls.length; i++) {
                    temp.controls[i].index = i
                }
                this.setState({
                    wireframer: temp,
                    elementSelected: null
                })
            }
        }
        else {
            console.log("No element selected.")
        }
    }
    selectElement = (index, event) => {
        event.stopPropagation();
        console.log("select control: " + index)
        if (this.state.elementSelected != null) {
            document.getElementById("control" + this.state.elementSelected).classList.remove("selected_control");
        }
        this.setState({
            elementSelected: index
        })
        document.getElementById("control" + index).className = "selected_control";
    }
    unselectElement = () => {
        if (this.state.elementSelected != null) {
            document.getElementById("control" + this.state.elementSelected).classList.remove("selected_control");
        }
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
    editName = (value) => {
        let t = this.state.wireframers;
        t[this.state.index].name = value;
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
            "width": 130,
            "height": 40,
            "text": "This is a button.",
            "text_font_size": 12,
            "background_color":"#bfc9ca",
			"border_color":"#7fb3d5",
			"text_color":"#17202a",
            "border_thickness": 2,
            "border_radius": 1
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
            "width": 85,
            "height": 20,
            "text": "This is a Label.",
            "text_font_size": 12,
            "background_color":"#bfc9ca",
			"border_color":"#7fb3d5",
			"text_color":"#17202a",
            "border_thickness": 0,
            "border_radius": 0
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
            "width": 110,
            "height": 20,
            "text": "This is a textfield.",
            "text_font_size": 12,
            "background_color":"#bfc9ca",
			"border_color":"#7fb3d5",
			"text_color":"#17202a",
            "border_thickness": 0,
            "border_radius": 0
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
            "background_color":"#bfc9ca",
			"border_color":"#7fb3d5",
			"text_color":"#17202a",
            "border_thickness": 2,
            "border_radius": 10
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