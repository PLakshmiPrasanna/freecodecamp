import React, { useEffect, useState, useRef } from "react";
import { bankOne, bankTwo } from "./keysData";

const DrumPad = ()=> {
    console.log(bankOne);
    const  [displayText, setDisplayText] = useState('');
    const [url, setUrl] = useState('');
    const [volume, setVolume] = useState();
    const[id, setId] = useState("");
    const [bank, setBank] = useState(bankOne);
    const bankRef = useRef(false);
    const [power, setPower] = useState(true);

    const togglePower = ()=>{
        console.log(power);
         setPower(!power);
        if(!power){
            setVolume(0);
            setUrl('');
            setDisplayText('');
            setBank(bankOne);
        }
    }

    const toggleBank = ()=>{
        console.log(bankRef);
        console.log(bank);
        if(!power) return;

        bankRef.current = !bankRef.current;
        (bankRef.current) ? setBank(bankTwo) : setBank(bankOne);
    //    if( bankRef.current === false ) {
    //      setBank(bankOne) ;
    //      bankRef.current = true;
    //    } else{
    //     setBank(bankTwo);
    //     bankRef.current = false;
    //    } 
    }

    const audioTrigger  = (e,url, name, id) =>{
        // console.log(e.keyCode);
        // const audioElement = new Audio(url);
        // audioElement.play();
        if(power){
            const audioElement =document.getElementById(id)
            audioElement.play();
            
            setDisplayText(name);
            setUrl(url);

        }        
    }

    const keyPress = (e) => {
        const filterdArr = bank.filter((obj)=> e.keyCode  === obj.keyCode);
        if(filterdArr.length != 0 ){
            const [{id, name, url}]=  filterdArr;
            setId(id);
            setUrl(url);
            setDisplayText(name);
            audioTrigger(e,url, name, id);
        }
        
    }

    useEffect( ()=> {
        document.addEventListener( 'keydown', function(e) {
            keyPress(e);
        });
        
    }, [volume])
    
    useEffect( ()=> {
        if (url && displayText ){
            audioTrigger("event", url, displayText, id);
        }
       console.log( typeof(displayText))
    }, [volume])

    const changeVolume = (e) => {
        console.log(e.currentTarget.value);
        if( displayText){
        var audioElement = document.getElementById(displayText);
        audioElement.volume = e.currentTarget.value / 100 ;
        setVolume(Math.floor(audioElement.volume * 100));
        }
    }

    return (
        <div id="displayDiv" >
            <div className="keysDisplay">
            {
                bank.map(key=>{
                    const {id, name, url} = key;
                    return <div key={id} id={name} className="drum-pad" onClick={(e)=> audioTrigger( e,url, name, id)}  > 
                        <audio src={url}  id={id} className="clip">
                            <source src={url} type="audio/mpeg" /> 
                        </audio> 
                        {id}
                    </div>


                })
            }
            </div>
            <div className="actionsDisplay">
                <div className="power">
                    <div>Power  </div>
                    <div><button onClick={togglePower} className={power === false ? "btn bankOne" : "btn bankTwo"} value={power}></button> </div>
                </div>
                <div className="displayText" id="display" readOnly> {displayText}
                    
                </div>
                
                <div className="volume">
                     <div>Volume{ volume && displayText &&  <span> : {volume} </span>} </div>
                    <input type="range" id="volume-control" onChange={changeVolume} min="1" max="100" value={volume}/>
                </div>
                
                <div className="bank">
                    <div>Bank  </div>
                    <div><button  onClick={toggleBank} className={bankRef.current === false ? "btn bankOne" : "btn bankTwo"} ></button> </div>
                </div>
            </div>
            
       </div>
        
    )
}

export default DrumPad