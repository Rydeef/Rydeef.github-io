import React from 'react'


function CalcInput(props){
    let counter = 0
    let c = props.inputArray.length - 1
    if(/(Infinity)/.test(props.inputArray.join(''))){
        props.inputArray.splice(0, props.inputArray.length, 'Division by zero is prohibited')
        
    }
    else if(/(NaN)/.test(props.inputArray.join(''))){
        props.inputArray.splice(0, props.inputArray.length, 'Error')
    }
    else if(/(undefined)/.test(props.inputArray.join(''))){
        props.inputArray.splice(0, props.inputArray.length, 'Error')
    }
    for(let i = props.inputArray.join('').split(/[+/*-]/).length-1; i>=0; i--){
        if(Number(props.inputArray.join('').split(/[+/*-]/)[i]) >= Number.MAX_SAFE_INTEGER){
            props.inputArray.splice(0, props.inputArray.length, 'Maximum permitted value exceeded')
        }
        if(Number(props.inputArray.join('').split(/[+/*-]/)[i]) <= Number.MIN_SAFE_INTEGER){
            props.inputArray.splice(0, props.inputArray.length, 'Minimum permitted value exceeded')
        }
    }
    
    
    for(c; c>=0; c--){
        
        if(props.inputArray[c] === '0.' || props.inputArray[c] === '.'){
            
            if((props.inputArray[c] === '0.' || props.inputArray[c] === '.') && counter === 2){
                props.inputArray.pop()
                
                props.setCalcValue([props.inputArray.join('')])
                counter = 2
            }
            counter = 2
        }
        else if(/[+*-/]/.test(props.inputArray[c])){
            counter = 0
        }
        if(/[*+/]/.test(props.inputArray[0])){
            props.inputArray.splice(0, 1)
        }

        if(props.inputArray[c] == '.' && /[\D]/.test(props.inputArray[c-1])){
            props.inputArray.splice(c, 1, '0.')
        }
        
        else if(/[.+-/*]/.test(props.inputArray[c]) && /[.+-/*]/.test(props.inputArray[c-1])){
            props.inputArray.splice(c-1, 1)
        }
        
    }

    

    return (
        <>
            <input type="text" readOnly className="calc-input" value = {props.inputArray.join('')}/> 
        </>
    )
}

export default CalcInput
