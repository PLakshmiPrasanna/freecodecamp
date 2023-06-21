import React from "react";
import { bankOne, bankTwo } from "./keysData";
import DrumPad from "./drumpad"; 

const DrumMachine  =  ()=>{

    return (
        <div className="dm-container">
            <h1> Drum machine</h1>
            <div id="drum-machine" >
                
                    <DrumPad />   {//9 
                    }
                
            </div>
        </div>
    )
}

export default DrumMachine