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
import { thisExpression } from '@babel/types';

class WireframerScreen extends Component {
    state = {
        wireframer:null,
        wireframers:null,

        index: null,
        userID:'',
        inArrayPosition:-1,
    }


    

    left=()=>{
        if(this.state.wireframer==undefined || this.state.wireframer.controls.length==0){
            return 0
        }
        else{
            return this.state.wireframer.controls[0].left
        }
    }
    
    top=()=>{
        if(this.state.wireframer==undefined ||this.state.wireframer.controls.length==0){
            return 0
        }
        else{
            return this.state.wireframer.controls[0].top
        }
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
                        this.state.wireframer.lastOpened=dt;
                        this.state.wireframers=wireframers;
                        this.state.inArrayPosition=i;
                        // this.setState({
                        //     wireframer:wireframers[i],
                        // })
                        
                        //if (this.state.wireframer!=undefined){
                        console.log("???????hahahah"+this.state.wireframer.board_width+this.state.wireframer.board_height);
                        document.getElementById("white_board").style.backgroundColor="red";
                        document.getElementById("white_board").style.width=this.state.wireframer.board_width;
                        //console.log(wireframers[i].board_width)
                        document.getElementById("white_board").style.height=this.state.wireframer.board_height;
                        //console.log(">>"+document.getElementById("white_board").style.width);
                        //}
                        break;
                    }
                }
                }

            )
        }

            //const fireStore=getFirestore();
            //if (this.state.wireframers!=null){
            // firebase.firestore().collection("users").doc(this.state.userID).update({
            //     "wireframers":[...this.state.wireframers]
            // })
            //}
        }
        //userRef=firebase.firestore().collection("users").doc(this.state.userID)
        const user1=firebase.firestore().collection("users").doc(this.state.userID);

        let wf111 = user1.get().wireframers;
        user1.get().then(doc=>{
            wf111 = doc.data().wireframers;
        })
        console.log(wf111)
        console.log("mmmmmm")
        console.log(this.props.profile.wireframers)


        // console.log(auth.uid)
        // console.log(this.props.users.users)
        // let uid=auth.uid
        // let users=this.props.users.users;
        //if (this.props.users.users!=undefined){
            console.log("FFFFFFFFF!!!!!!")
            //let user=users[uid];
            //console.log(users)
            //let wf=null;
        //}

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
                                left={this.left()}
                                top={this.top()}
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
        //  this.setState({
        //     left: this.state.left + deltaX,
        //     top: this.state.top + deltaY
        //     })
        let temp=this.state.wireframer;
        console.log("...."+deltaX+"."+deltaY)
        console.log(",,,"+temp.controls[0].top+"."+temp.controls[0].left)
        
        temp.controls[0].left=temp.controls[0].left+deltaX;
        temp.controls[0].top=temp.controls[0].top+deltaY;
        console.log("!!!in drag")
        console.log(temp.controls[0])
        // this.setState(
        //     {controls:temp},
        //     ()=>{console.log()}
        // );
         this.setState(
           { wireframer:temp,}
        );

       // this.state.wireframer.controls=temp;
        // let x=this.state.wireframer;
        // x.controls=temp;
        // this.setState({
        //     wireframer:x,
        // })
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

        // const increment =({wireframer},temp)=>({
        //     wireframer:temp,
        // });
        // this.setState(
        //     {wireframer: temp},
        //     ()=>{console.log("~~~~~");
        //         console.log(this.state.wireframer.controls[0])}
        // );
        this.setState({
            wireframer:temp,
        })

      }

    getLeft=()=>{
    }
    handleSelected=()=>{
    }
    saveWork=(controls)=>{
        //const fireStore=getFirestore();
        console.log("////in save work")
        console.log(controls[0].height)
        console.log(this.state.wireframer.controls[0].height)
        
        let userRef=firebase.firestore().collection("users").doc(this.state.userID)
        let x=this.state.wireframers;
        x[this.state.inArrayPosition]=this.state.wireframer;    
        // console.log(x)
        userRef.update({
            "wireframers":x
        })
        
        alert("You have to implement to save this work");
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