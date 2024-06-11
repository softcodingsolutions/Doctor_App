import React, { useState } from 'react'
import Consulting from './Consulting';
import Indooractivity from './Indooractivity';

export default function Oldcase() {
    const [caseNumber,setCaseNumber] = useState ('');
    const [choice,setChoice] = useState('');
    const handleCaseNumber = (e) =>{
        setCaseNumber(e.target.value);
    }
    const handleChoice = (e) =>{
        setChoice(e.target.value);
    }
  return (

          <div>
            <form>
                <div>
                    <label>Enter Case Number: </label>
                    <input type='text' onChange={handleCaseNumber}
                    className="border-2 rounded-md p-2"
                    placeholder='Enter Case number' 
                    required/>
                </div>
                <div className="flex gap-5 m-2">
                    <label>Select Choice: </label>
                    <select
                        className="border-2 rounded-md p-2"
                        onChange={handleChoice}
                        value={choice}
                        required
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="consulting">Cosulting</option>
                        <option value="indooractivity">Indoor Activity</option>
                    </select>
                </div>
                <div>
                    {choice === 'consulting' && <Consulting />}
                    {choice === 'indooractivity' && <Indooractivity />}
                </div>
            </form>
          </div>
  )
}
