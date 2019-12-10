import React, { Component } from 'react';
import Moveable from "react-moveable";


export class moveableDemo extends Component {
    render(){
        console.log("!!");
        alert("!");
        return (
           <div>
               <button className="draggable">
                   YOOOOO!
               </button>
                <Moveable
                    target={document.querySelector(".draggable")}
                    draggable={true}
                    throttleDrag={0}
                    onDrag={({ target, left, top, beforeDelta }) => {
                        target.style.left = left + "px";
                        target.style.top = top + "px";
            
                        /* const translate = this.translate */
                        /* translate[0] += beforeDelta[0]; */
                        /* translate[1] += beforeDelta[1]; */
                        /* target.style.transform
                            = "translateX(" + translate[0] + "px) "
                            + "translateY(" + translate[1] + "px)"; */
                    }}
                />
            </div>
        );
    }

}
export default moveableDemo;