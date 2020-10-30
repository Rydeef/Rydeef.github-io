import React, { useState} from 'react'
import CalcInput from './Calc/CalcInput.js'
import CalcButtons from './Calc/CalcButtons.js'
import CalcClear from './Calc/CalcClear.js'


function App() {

  const [calcValue, setCalcValue] = useState(['0'])
  
  let inputArray = calcValue.join('').split('')
  
  return(
    <div className="container">
      <div className="calc">
        <CalcInput inputArray={inputArray} calcValue={calcValue}setCalcValue={setCalcValue}></CalcInput>
        <CalcClear inputArray={inputArray} calcValue={calcValue} setCalcValue={setCalcValue}></CalcClear>
        <CalcButtons inputArray={inputArray} calcValue={calcValue} setCalcValue={setCalcValue}></CalcButtons>
      </div>
    </div>
  )
}

export default App;
