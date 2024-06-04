import React,{useState} from 'react'
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrentDietSchema } from "../../../schemas/UserDetailsSchema";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axios from 'axios';
function FranchiesComplains({onNext,onBack}) {
  const email = localStorage.getItem('client_email');

  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  
  const submittedData = async(d)=>{
    console.log(d);
    try {
      await axios.put(
        `/api/v2/users/update_personal_details?email=${email}`,
        {
          personal_detail: {
            complaints: JSON.stringify(d),
          },
        }
      ).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      reset();
      onNext();
    } catch (error) {
      console.error(error);
    }
  }
  const handleChange=(event,newValue)=>{
    setSelectedDiseases(newValue);
    setValue('Complain', newValue); // register selected diseases with react-hook-form
    console.log(newValue);
  }
  return (
    <div className="w-full p-2">
    <div className="rounded-lg bg-card h-[90vh] bg-white">
      <div className="flex p-4 h-full flex-col space-y-4">
        <div className="text-xl font-semibold">Complains</div>
        <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
          <form
            onSubmit={handleSubmit(submittedData)}
            className="w-[80%] h-full flex flex-col items-center justify-between"
            method="post"
          > 
           <div className='flex flex-col gap-10 justify-between w-full'>
            <h2 className=''>Choose the complain below if you have any of your complain is mentioned.</h2>
                <Select
                  defaultValue={['']}
                  multiple
                  onChange={handleChange}
                  sx={{
                    minWidth: '13rem',
                  }}
                  slotProps={{
                    listbox: {
                      sx: {
                        width: '100%',
                      },
                    },
                  }}
                >
                  <Option value="Constipation">Constipation (H/S)</Option>
                  <Option value="Acidity">Acidity</Option>
                  <Option value="Gas">Gas</Option>
                  <Option value="Ioose_Motion">Ioose Motion</Option>
                  <Option value="Piles">Piles</Option>
                  <Option value="Ulcer">Ulcer</Option>
                  <Option value="Anemia">Anemia</Option>
                  <Option value="Heart_disease">Heart Disease</Option>
                  <Option value="Hypertension">Hypertension</Option>
                  <Option value="D.M">D.M</Option>
                  <Option value="Thyroid">Thyroid</Option>
                  <Option value="Depression">Depression</Option>
                  <Option value="Allergy">Allergy</Option>
                  <Option value="High_cholesterol">High Cholesterol</Option>
                  <Option value="Joint_pain">Joint Pain</Option>
                  <Option value="Backache">Backache</Option>
                  <Option value="Swelling_of_face_hands_feet">Swelling of Face-Hands-Feet</Option>
                </Select>
            <div>
              <label>Other Complain</label>
              <textarea rows={3} className='border-2 w-full' {...register('additional_complains')}/>
              <h2 className='font-semibold text-md'>If your complain is not mentioned, write it in box.</h2>
            </div>
           </div>
            <div className="flex w-full justify-center gap-3">
              <button name='Back' className='w-[20rem] p-1 text-white bg-black rounded-md border border-gray-500 font-medium text-lg hover:scale-105' onClick={onBack}>Back</button>
               <SaveUserDetailsButton name="Save & Continue" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FranchiesComplains