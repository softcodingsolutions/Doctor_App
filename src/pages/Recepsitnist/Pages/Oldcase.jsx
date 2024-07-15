import React, { useState } from 'react'
import Consulting from './Consulting';
import Indooractivity from './Indooractivity';

export default function Oldcase(props) {
    const [choice, setChoice] = useState('');
    
    const handleChoice = (e) => {
        setChoice(e.target.value);
    }

    return (
        <div>
            <form>
                <div className="flex gap-5 m-2">
                    <label className="text-lg text-end w-1/3 mr-2">Select Choice: </label>
                    <select
                        className="py-1 px-2 rounded-md border border-black w-[40vh]"
                        onChange={handleChoice}
                        value={choice}
                        required
                    >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="consulting">Consulting</option>
                        <option value="indooractivity">Indoor Activity</option>
                    </select>
                </div>
                <div>
                    {choice === 'consulting' && <Consulting doctor={props.doctor} user={props.user} />}
                    {choice === 'indooractivity' && <Indooractivity doctor={props.doctor} user={props.user} machine={props.machine} machineTime={props.machineTime}/>}
                </div>
            </form>
        </div>
    )
}
