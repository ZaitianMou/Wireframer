import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {getFirebase ,getFirestore} from 'react-redux-firebase';
import DragResizeContainer from 'react-drag-resize';
import Moveable from "react-moveable";
import firebase from "../../config/firebaseConfig";
import ResizableRect from 'react-resizable-rotatable-draggable';
import { Button, Modal } from 'react-materialize';
class WireframerScreen extends Component {
    state = {
        wireframer:null,
        wireframers:null,

        index: null,
        userID:'',
        inArrayPosition:-1,
    }

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if (this.props.users==undefined)
            return <React.Fragment />

        this.state.index=this.props.match.params.index;
        this.state.userID=getFirebase().auth().currentUser.uid;
        const dt = new Date();
        const x = dt.toUTCString();
        if(this.state.wireframers==null){

            if (this.props.users.users!=undefined){
                console.log("!!!");
                const user=firebase.firestore().collection("users").doc(this.state.userID);
                user.get().then(doc=>{
                    const wireframers=doc.data().wireframers;
                    console.log(">>>")
                    console.log(wireframers)
                    const i=this.props.match.params.index;
                    if (wireframers[i].index==this.state.index){
                        this.state.wireframer=wireframers[i]
                        this.state.wireframer.lastOpened=dt;
                        this.state.wireframers=wireframers;
                        this.state.inArrayPosition=i;
                        
                        this.state.wireframers[i].lastOpened=x;
                        user.update({
                            wireframers:this.state.wireframers
                        })

                        //if (this.state.wireframer!=undefined){
                        console.log("???????hahahah"+this.state.wireframer.board_width+this.state.wireframer.board_height);
                        document.getElementById("white_board").style.backgroundColor="red";
                        document.getElementById("white_board").style.width=this.state.wireframer.board_width;
                        document.getElementById("white_board").style.height=this.state.wireframer.board_height;
                
                    }
                })
            }
        }
        return (
            <div>
                <p classNmae="large">
                    {this.state.wireframer?this.state.wireframer.name:null}
                </p>
                <div className="row outContainer">
                    <div className="col s2">
                        <div className="zoomAndSaveSection">
                            <i className="material-icons">zoom_in</i>
                            <i className="material-icons">zoom_out</i>
                            <p className="save_button" onClick={() => this.saveWork(this.state.wireframer.controls)} >Save</p>
                            <p className="close_button" className={"modal-trigger"} href={"#modalWhenClose"} >Close</p>
                            <Modal id="modalWhenClose"  header={"Want to save your work before leave?"}>
                                <Link to="/" ><Button className="submit_button_in_modal" onClick={()=>{this.saveWork()}}>
                                        <i>Save</i>
                                </Button></Link>
                                <Link  to="/"><Button className="red">
                                        Don't save.
                                </Button></Link>
                            </Modal>
                        </div>
                        <div className="divider"></div>
                        <div className="add_element_section">


                            <div onClick={()=>this.createAContainer()} className="add_element_icon">
                                <p>Container</p>
                            </div>
                            <div onClick={()=>this.createALebel()} className="add_element_icon">   
                            <p>Prompt for input</p>
                                <p>Label</p>
                            </div>

                            <div onClick={()=>this.createAButton()} className="add_element_icon">
                                <button disabled={true}>Submit</button>
                                <p>Button</p>
                            </div>
                            <div onClick={()=>this.createATextfield()} className="add_element_icon">
                                <i className="material-icons">text_fields</i>
                               
                                <p>Textfield</p>
                            </div>

                        </div>

                    </div>
                    <div className="col s7">
                        <div id="white_board">
                            
                             <button style={this.state.wireframer==undefined || this.state.wireframer.controls==undefined
                             || this.state.wireframer.controls.length==0? {}:{width:this.state.wireframer.controls[0].width, 
                             height:this.state.wireframer.controls[0].height, top:this.state.wireframer.controls[0].top, 
                             left:this.state.wireframer.controls[0].left, position: 'absolute'}}> YOOOO </button>

                            <ResizableRect
                                left={this.state.wireframer==undefined ||this.state.wireframer.controls.length==0?0:this.state.wireframer.controls[0].left}
                                top={this.state.wireframer==undefined ||this.state.wireframer.controls.length==0?0:this.state.wireframer.controls[0].top}
                                width={this.state.wireframer==undefined ||this.state.wireframer.controls.length==0?0:this.state.wireframer.controls[0].width}
                                height={this.state.wireframer==undefined ||this.state.wireframer.controls.length==0?0:this.state.wireframer.controls[0].height}
                                // rotateAngle={rotateAngle}
                                // aspectRatio={false}
                                // minWidth={10}
                                // minHeight={10}
                                zoomable='n, w, s, e, nw, ne, se, sw'
                                // onResizeStart={this.handleResizeStart}
                                onResize={this.handleResize}
                                // onResizeEnd={this.handleUp}
                                // onDragStart={this.handleDragStart}
                                onDrag={this.handleDrag}
                                // onDragEnd={this.handleDragEnd}
                            />
                                                
                        </div>
                         
                    </div>


                    <div className="col s3">
                        

                    </div>
                </div>
            </div>
        );
    }
    handleDrag = (deltaX, deltaY) => {
        let temp=this.state.wireframer;
        temp.controls[0].left=temp.controls[0].left+deltaX;
        temp.controls[0].top=temp.controls[0].top+deltaY;
         this.setState(
           { wireframer:temp,}
        );
      }
     
    handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)

        let temp=this.state.wireframer;
        console.log(temp.controls)
        console.log("????")
        temp.controls[0].top=top;
        temp.controls[0].height=height;
        temp.controls[0].left=left;
        temp.controls[0].width=width;
        this.setState({
            wireframer:temp,
        })

      }

    getLeft=()=>{
    }
    handleSelected=()=>{
    }
    saveWork=(controls)=>{
        let userRef=firebase.firestore().collection("users").doc(this.state.userID)
        let x=this.state.wireframers;
        x[this.state.inArrayPosition]=this.state.wireframer;    
        userRef.update({
            "wireframers":x
        })
        
        alert("Saved");
    }

    createAButton=()=>{
        alert("New button")
    }
    createALebel=()=>{
        alert("New Lebel")
    }
    createATextfield=()=>{
        alert("New textfield")
    }
    createAContainer=()=>{
        alert("New container")
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