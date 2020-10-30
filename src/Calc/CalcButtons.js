import React, { useEffect } from "react"
import { useState } from "react"



function CalcButtons(props){
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, '.', 0]
  const actions = ['/', '*', '-', '+']
  const [lastChar, setLastChar] = useState('')
  const [lastAct, setLastAct] = useState('')
  const addValue = (char) => () => {
    
    if(props.inputArray[0] == '0' && /[\d]/.test(char) && props.inputArray.length < 2){
      props.setCalcValue([''])
      props.setCalcValue([char])
     
    }
    else{
      props.setCalcValue([props.calcValue + char])
      
      if(/[.]/.test(char)){
        setLastChar('')  
      }
      else{
        setLastChar(char)  
        setLastAct('')
      }
      
    }
    
    
    if(props.calcValue == 'Infinity' || props.calcValue == '-Infinity'){
      props.setCalcValue(['0'])
      props.setCalcValue([char])
    }
    if(props.calcValue == 'NaN'){
      props.setCalcValue(['0'])
      props.setCalcValue([char])
    }
    if(props.calcValue == 'undefined'){
      props.setCalcValue(['0'])
      props.setCalcValue([char])
    }
    if(props.calcValue == 'Maximum permitted value exceeded' || props.calcValue == 'Minimum permitted value exceeded'){
      props.setCalcValue(['0'])
      props.setCalcValue([char])
    }
    
  }
  
  useEffect(() => {
    
    if(/[-]/g.test(props.inputArray[0]) && /\d/g.test(props.inputArray[1])){
      if(props.inputArray.join('').split(/[-+/*]/g).length === 4){
        props.inputArray.pop()
        equally()
        
      }
    }
    else{
      if(props.inputArray.join('').split(/[-+/*]/g).length === 3){
        props.inputArray.pop()
        equally()
        
      }
    }
    
  },[props.inputArray.join('').split(/[-+/*]/g).length]
  )
  

  function equally(){
    let c, actChar = [], numChar = []
    if(props.inputArray.join('').split(/[+/*-]/).length === 1 && !/\d/.test(lastAct)){
      props.setCalcValue([props.inputArray.join('')])
    }
    else{
      if(/[-]/.test(props.inputArray[0])){
        if(true && /[\d]/.test(props.inputArray[1])){
          numChar = props.inputArray.join('').split(/[+/*-]/)
          actChar = props.inputArray.join('').split(/[.\d]/).join('').split('')
          numChar.splice(0, 2, actChar[0] + numChar[1])
          actChar.shift()
        }
      }
      
      numChar = props.inputArray.join('').split(/[+/*-]/)
      actChar = props.inputArray.join('').split(/[.\d]/).join('').split('')
      
      
      let j
      for(j=0;j<=numChar.length - 1;j++){
        numChar[j] = Number(numChar[j])
      }
      
      let answer
      function equal() {
        for(c=0; c<=actChar.length - 1; c++){
          if(actChar[c] === '+'){
            answer = numChar[c] + numChar[c+1]
            setLastAct(actChar[c] + numChar[c+1])
          }
          if(actChar[c] === '-'){
            answer = numChar[c] - numChar[c+1]
            setLastAct(actChar[c] + numChar[c+1])
          }
          if(actChar[c] === '/'){
            answer = numChar[c] / numChar[c+1]    
            setLastAct(actChar[c] + numChar[c+1])
          }
          if(actChar[c] === '*'){
            answer = numChar[c] * numChar[c+1]
            setLastAct(actChar[c] + numChar[c+1])
          }
        }
        
      }
      equal()
      if(/[\D]/.test(lastChar)){
        props.setCalcValue([answer + lastChar])
      }
      else{
        if(/[-]/.test(props.inputArray[0])){
          numChar = props.inputArray.join('').split(/[+/*-]/)
          actChar = props.inputArray.join('').split(/[.\d]/).join('').split('')
          numChar.splice(0, 2, actChar[0] + numChar[1])
          actChar.shift()
          numChar.push(Number(lastAct.split(/[+/*-]/).join('')))
          actChar = lastAct.split(/[.\d]/).join('').split('')
          for(j=0;j<=numChar.length - 1;j++){
            numChar[j] = Number(numChar[j])
          }
          equal()
          props.setCalcValue([answer])
        }
        else{
          if(props.inputArray.join('').split(/[+/*-]/).length === 1){
          
            numChar.push(Number(lastAct.split(/[+/*-]/).join('')))
            actChar = lastAct.split(/[.\d]/).join('').split('')
            equal()
            props.setCalcValue([answer])
          }
          else{
            props.setCalcValue([answer])
          }
        }
        
      }
      
    }
    
  }

  return(
    <div className="calc-buttons">
      <div className="calc-buttons-numbers">
        {numbers.map((num, index)  => (
          <button onClick={addValue(num)} key={index}>{num}</button>
        ))}
        <button onClick={equally}>=</button>
      </div>
      <div className="calc-buttons-actions">
        {actions.map((act, index) => (
          <button onClick={addValue(act)} key={index} >{act}</button>
        ))}
        
      </div>
    </div>
  )
  
}
export default CalcButtons