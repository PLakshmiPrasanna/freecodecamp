import React, { useEffect, useState, useRef } from "react";
import { calcData } from "./calcData";
import './calcStyles.css';

const Buttons = ({setParentInput1})=> {

    
    const userInput = {inputText : '' , result: '' };
    const [input, setInput] = useState(userInput);
    const [name, setName] = useState('');
    const [data, setData] = useState('');
   
    let equalClick = useRef(false);
    const individualNumbers = useRef([]);
    
    const buttonClick = (e, name, data)=>{
        console.log(name, data);
        let {inputText, result} = input
        const length = individualNumbers.current.length;
        switch(data){
            case "=":  if(inputText != '' ){
                        try{
                            result = eval(inputText);
                        }catch(err){
                            setInput({
                                ...input, result :"Math error"
                            })
                        }
                       

                        if(result == undefined){
                            setInput({
                                ...input, result :"Math error"
                            })
                        }else{
                            setInput({
                                inputText : '' , result: result
                            })
                        }
                     }
                     equalClick.current = true;
                     break;
            case "AC":equalClick.current = false;
                        setInput ({ inputText: 0 , result : '' });
                        console.log(input);
                        break;
            case '.': equalClick.current = false;
                     console.log(individualNumbers.current);
                      
                     if( individualNumbers.current[length-1].match(/\./g)?.length >= 1){
                        break;  
                     }else{
                        setInput( {  result: '', inputText: inputText.concat(data) } ) ;
                     }
                        
                        break;
        
            case "delete": equalClick.current = false;
                        inputText = inputText.substring(0, inputText.length-1);
                             break;
            case '-':
            case '*':  
            case '+':
            case '/':   const operators  = inputText.match(/[+\-*/]?[+\-*/]$/);
                        
                        if(operators && data!='-'){
                            inputText = inputText.substring(0, operators.index)
                        }
                       
                        if(equalClick.current ){
                            setInput( {  result: '', inputText: result.toString().concat(data) } ) ;
                            equalClick.current = false;
                       }else{
                        setInput( {  result: '', inputText: inputText.concat(data) } ) ;
                       }
                        
                        break;
            default: equalClick.current = false;
                    if(inputText.toString().startsWith("0")) {
                        setInput({result: '', inputText : data });
                    }else{
                        setInput( {  result: '', inputText: inputText.concat(data) } ) ;
                    }
                
                    
        }
    }

    useEffect(()=>{
        console.log(input);
        setParentInput1(input);
        individualNumbers.current = input.inputText.toString()?.split(/[+\-*/]/);
    },[input]);


    return (
        // <button className="item1">AC</button>
        <>            
         {
            calcData.map(btn =>{ 
                const {name, data} = btn;
                return <button key={name} className={name}  id={name}
                onClick={(e)=>buttonClick(e,name, data)} >{data}</button>  
            })            
        } 
        </>
    )

}
export default Buttons