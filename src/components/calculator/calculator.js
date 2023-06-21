import React, { useState } from "react";

import Buttons from "./Buttons";
import './calcStyles.css';

const Calculator = ()=>{
    const [parentInput, setParentInput] = useState({});
    console.log(parentInput);
    
    

    return (
        <div className="calc-container">
            <div className="calc-box">
                <div id="display">
                    { parentInput.result && <span>{parentInput.result}</span> }
                    {    !parentInput.result && <span>{parentInput.inputText}</span> }
                    
                </div>
                 <div className="buttons">
                   <Buttons setParentInput1={setParentInput}/>
                </div> 
                 
            </div>
        </div>
    )
}

export default Calculator;
