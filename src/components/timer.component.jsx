import React,{useEffect,useState,useRef} from 'react'
import "./timer.css";


function Timer() {
    const [counter,setCounter]=useState(0);
    const [isActive,setIsActive]=useState(false);

    const refSlice1= useRef(null);
    const refSlice2= useRef(null);

    const progressBarUpdate=function(x,x_percentage){
        const outOf=360;
        let firstHalfAngle=180;
        let secondHalfAngle=0
        
        const drawAngle=x/outOf*360;
        if(drawAngle<=180){
            firstHalfAngle=drawAngle;
        }else{
            secondHalfAngle=drawAngle-180;
        }
       
        if(secondHalfAngle<1){
            rotate(refSlice1.current,firstHalfAngle)
        }
        
        rotate(refSlice2.current,secondHalfAngle)
    }

    const rotate=(element,degree)=>{
        const css={
            '-webkit-transform':`rotate(${degree}deg)`,
            '-moz-transform':`rotate(${degree}deg)`,
            '-mos-transform':`rotate(${degree}deg)`,
            '-o-transform':`rotate(${degree}deg)`,
            'transform':`rotate(${degree}deg)`,
            'zoom':1
        }
        Object.assign(element.style,css)
    }
    
    useEffect(()=>{
        let intervalId;
        if(isActive){
            intervalId=setInterval(()=>{
                const oldval=counter;
                setCounter(counter=>counter+1);
                if(counter>360){
                    setCounter(0);
                    setIsActive(false)
                }
                else{
                    progressBarUpdate(counter,oldval)
                }
            },300)
        }
        return ()=>clearInterval(intervalId);
    },[isActive,counter])

    return (
        <>
        <div className="pie" data-x="0" onClick={()=>{setIsActive(!isActive)}} >
            <div className="clip1">
                <div className="slice1" ref={refSlice1}></div>
            </div>
            <div className="clip2">
                <div className="slice2" ref={refSlice2}></div>
            </div>
            <div className="inner">
                {/* <div className="status">{counter} of 360</div> */}
            </div>
        </div>
        {/* <div className="debug"></div> */}
        </>
    )
}

export default Timer
