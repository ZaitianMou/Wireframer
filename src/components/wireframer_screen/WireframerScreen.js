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
        name: '',
        owner: '',
        controls:null,
            // {
            // "width":190,
            // "height": 50,
            // "left": 300,
            // "top": 300,
            // }

        
        wireframer:null,
        wireframers:null,
        board_height:null,
        board_width:null,

        index: null,
        userID:'',


        // width: 100,
        // height: 100,
        // top: 100,
        // left: 100,
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
        if (this.props.users.users!=undefined){
            // const fireStore = getFirestore();
 
            console.log("!!!");
            const user=firebase.firestore().collection("users").doc(this.state.userID);
            user.get().then(doc=>{
                const wireframers=doc.data().wireframers;
                console.log(">>>")
                console.log(wireframers)
                for (let i=0;i<wireframers.length;i++){
                    if (wireframers[i].index==this.state.index){
                        this.state.wireframer=wireframers[i]
                        wireframers[i].lastOpened=dt;
                        wireframers[i]=this.state.wireframer;
                        this.state.wireframers=wireframers;
                        this.state.controls=this.state.wireframer.controls;
                        this.state.board_height=wireframers[i].board_height;
                        this.state.board_width=wireframers[i].board_width;


                        // this.setState({
                        //     board_height:wireframers[i].board_height,
                        //     board_width:wireframers[i].board_width,
                        //     controls: wireframers[i].controls,
                        //     wireframers:wireframers,
                        //     wireframer:wireframers[i],

                        // })
                        
                        if (wireframers[i]!=undefined){
                            //console.log("???????hahahah")
                            document.getElementById("white_board").style.color="black";
                            document.getElementById("white_board").style.width=wireframers[i].board_width;
                            //console.log(wireframers[i].board_width)
                            document.getElementById("white_board").style.height=wireframers[i].board_height;
                            //console.log(">>"+document.getElementById("white_board").style.width);
                        }
                        
                        break;
                    }
                }

            })
            //const fireStore=getFirestore();
            //if (this.state.wireframers!=null){
            // firebase.firestore().collection("users").doc(this.state.userID).update({
            //     "wireframers":[...this.state.wireframers]
            // })
            //}
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
                            <p className="save_button" onClick={() => this.saveWork(this.state.controls)} >Save</p>
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

                             <button style={this.props.users.users==undefined || this.state.controls==null?{}:{width:this.state.controls[0].width, height:this.state.controls[0].height, 
            top:this.state.controls[0].top, left:this.state.controls[0].left, position: 'absolute'}}> YOOOO </button>

                            <ResizableRect
                                left={this.props.users.users==undefined  || this.state.controls==null?0:this.state.controls[0].left}
                                top={this.props.users.users==undefined  || this.state.controls==null?0:this.state.controls[0].top}
                                width={this.props.users.users==undefined  || this.state.controls==null?0:this.state.controls[0].width}
                                height={this.props.users.users==undefined  || this.state.controls==null?0:this.state.controls[0].height}
                                // rotateAngle={rotateAngle}
                                // aspectRatio={false}
                                // minWidth={10}
                                // minHeight={10}
                                zoomable='n, w, s, e, nw, ne, se, sw'
                                // rotatable={true}
                                // onRotateStart={this.handleRotateStart}
                                onRotate={this.handleRotate}
                                // onRotateEnd={this.handleRotateEnd}
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
        //  this.setState({
        //     left: this.state.left + deltaX,
        //     top: this.state.top + deltaY
        //     })

            let temp=this.state.controls;
            temp[0].left=temp[0].left+deltaX;
            temp[0].top=temp[0].top+deltaY;
            console.log("!!!in drag")
            console.log(temp[0])

            this.setState({
                controls:temp
            })
      }
     
    handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style
        top = Math.round(top)
        left = Math.round(left)
        width = Math.round(width)
        height = Math.round(height)

        let temp=this.state.controls;
        temp[0].top=top;
        temp[0].height=height;
        temp[0].left=left;
        temp[0].width=width;
        this.setState({
            controls:temp
        })
        console.log(this.state.controls[0].height)

      }

    getLeft=()=>{
    }
    handleSelected=()=>{
    }
    saveWork=(controls)=>{
        //const fireStore=getFirestore();
        console.log("////in save work")
        console.log(controls[0].height)
        console.log(this.state.controls[0].height)
        this.state.wireframers.controls=this.state.controls;
        
        let userRef=firebase.firestore().collection("users").doc(this.state.userID)
        
        console.log(userRef);
        userRef.update({
            "wireframers":this.state.wireframers
        })
        
        
       // .wireframers[0].controls=this.state.controls;
        
        alert("You have to implement to save this work");
    }

    createAButton=()=>{
        alert("New button")
        
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
        users: state.firestore.data
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(WireframerScreen);