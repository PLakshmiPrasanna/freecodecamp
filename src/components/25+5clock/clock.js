import React, { useEffect, useState } from "react";
import './clockStyles.css'
import {FaArrowDown, FaArrowUp, FaPause, FaPlay} from 'react-icons/fa';
import {FiRefreshCw} from 'react-icons/fi';

const  Clock = ()=>{

    const initialState  = {
                                breakLength: 5,
                                sessionLength: 25,
                                displayTime: 1500
                          }
    const [clock, setClock] = useState(initialState);
    const {breakLength, sessionLength, displayTime} = clock;
    const [timerOn, setTimerOn ] = useState(false);
    const [timerLabel, setTimerLabel] = useState("Session");

    const audioElement =document.getElementById('beep')
    
    
    const formatTime = (time)=>{
        let minutes = Math.floor(time/60);
        let seconds = Math.floor(time%60);
        minutes = (minutes< 10)? "0"+minutes : minutes;
        seconds = (seconds < 10 ) ? "0"+seconds: seconds;
        return minutes+":"+seconds;
    }

    const breakIncrement = ()=>{
        
        if(breakLength < 60 ){
            setClock(prev=> {return {...clock, breakLength: breakLength+1}});
        }
    }
    
    const breakDecrement = () =>{
       
        if(breakLength > 1 ){
            setClock(prev=>{ return {...clock, breakLength: breakLength-1}});
        }
    }

    const sessionIncrement= ()=>{
       
        if(sessionLength < 60){
            setClock(prev=> { return {...clock, sessionLength: sessionLength+1}});
        } 
    }
    const sessionDecrement= ()=>{
        
        if(sessionLength > 1 ){
            setClock(prev=> {return {...clock, sessionLength: sessionLength-1}});
        }
    }

    
    
    
    const timerClick = () => {
        setTimerOn(!timerOn) ;
    }

    const resetClick = ()=>{
        setClock(initialState);
        setTimerLabel("Session");
        setTimerOn(false);
        audioElement.pause();
        console.log(audioElement.currentTime); 
        audioElement.currentTime = 0;
        console.log(audioElement.currentTime); 
    }

    useEffect(()=>{
        if(timerOn){
            return;
        }
        if((timerLabel == "Session")){    
            setClock({...clock, displayTime: sessionLength*60});
        }
    }, [sessionLength ])

    useEffect(()=>{
        if(timerOn){
            return;
        }
        if((timerLabel == "Break")){
            setClock({...clock, displayTime: breakLength*60})
        }
    }, [breakLength ])

    useEffect( ()=>{
        if(!timerOn) { return;}
       const timerInterval =  displayTime > 0 && setInterval(() => 
            setClock( {...clock, displayTime: (displayTime - 1)}), 1000);
        console.log(timerInterval);
         

        if(displayTime == 0){ 
            audioElement.play();
           
            setTimeout(()=> {
              if((timerLabel == "Session")){
                    setTimerLabel("Break") ;
                    setClock({...clock, displayTime: breakLength*60});
                } else{
                    setTimerLabel("Session");
                    setClock({...clock, displayTime: sessionLength*60})
                }
               // audioElement.pause();
                //audioElement.duration = 1;
               
            }, 1000);
          
             
        }  
        return ()=> clearInterval(timerInterval);
    }, [displayTime, timerOn])

    // useEffect(()=>{
    //     if(displayTime == 0){
           
    //         //audioElement.duration = 1;
    //         if((timerLabel == "Session")){
    //             setTimerLabel("Break") ;
    //             setClock({...clock, displayTime: breakLength*60});
    //         } else{
    //             setTimerLabel("Session");
    //             setClock({...clock, displayTime: sessionLength*60})
    //         }
    //     } 
        
    // },[timerLabel] )
    



    return (
        <div id="clock-container">
            <div id="clock-box">
                <h1> 25 + 5 Clock</h1>
                <div id="label">
                    <div id="break">
                        <div id="break-label">Break Length</div>
                        <div id="break-clicks">
                            <button id="break-decrement" disabled={timerOn} onClick={breakDecrement}><FaArrowDown /></button> 
                            <div id="break-length"> {breakLength} </div>
                            <button id="break-increment" disabled={timerOn} onClick={breakIncrement}><FaArrowUp /></button> 
                        </div>
                    </div>
                    <div id="session">
                        <div id='session-label'> Session Length</div>
                        <div id="session-clicks">
                            <button id="session-decrement" disabled={timerOn} onClick={sessionDecrement}><FaArrowDown /></button> 
                            <div id="session-length">{sessionLength} </div>
                            <button id="session-increment" disabled={timerOn} onClick={sessionIncrement}><FaArrowUp /></button> 
                        </div>
                    </div>
                </div>
                <div id="timer">
                    <div id= "timer-box">
                        <div id="timer-label"> {timerLabel} </div>
                        <div id="time-left"> {formatTime(displayTime)} </div>
                    </div>
                    <button id="start_stop" onClick= {timerClick}>
                      { (timerOn)?  <FaPause/> : <FaPlay/> }
                    </button>
                    <audio id="beep">
                        <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
                    </audio>
                    <button id="reset" onClick={resetClick}><FiRefreshCw/> </button>
                </div>
            </div>  
        </div>
        
    )
}

export default Clock;