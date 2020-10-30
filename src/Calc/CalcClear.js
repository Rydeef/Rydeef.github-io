import React from 'react'

function CalcClear(props){
    
    function clear(){
        props.setCalcValue(['0'])
        
    }
    function undo(){
        props.inputArray.splice(props.inputArray.length - 1, 1)
        props.setCalcValue([props.inputArray.join('')])
        if(props.calcValue.join('') === 'Error'){
            props.setCalcValue(['0'])
        }
        
    }
    
    return (
    <>
        <button type="submit" className="calc-clear" onClick={clear}>CLEAR</button>
        <button type="submit" className="calc-undo" onClick={undo}>UNDO</button>
    </>
    )
}

export default CalcClear