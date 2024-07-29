import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function SurveyForm3() {
    const navigate = useNavigate();
    const [selectedCheckboxes3, setSelectedCheckboxes3] = useState([]);
    const [selectedCheckboxes4, setSelectedCheckboxes4] = useState([]);
    const [language, setLanguage] = useState('English');
    
    const [code,setCode]  = React.useState();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleCodeClose = () =>{
        setCode(false);
      }
      const handlePasscode = (e) =>{
        setPasscode(e.target.value);
    } 
    
    const handlePasswordhandle = () =>{

    }

    const handleCheckboxChange3 = (e) => {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedCheckboxes3((prevState) => [...prevState, checkboxValue]);
        } else {
            setSelectedCheckboxes3((prevState) =>
                prevState.filter((value) => value !== checkboxValue)
            );
        }
    };

    const handleCheckboxChange4 = (e) => {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedCheckboxes4((prevState) => [...prevState, checkboxValue]);
        } else {
            setSelectedCheckboxes4((prevState) =>
                prevState.filter((value) => value !== checkboxValue)
            );
        }
    };

    const submittedData3 = (data) => {
        setCode(true);
      
    };

    const handleBack = () => {
        navigate('/surveyform2');
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const items3 = [
        'Do you have trouble sleeping at night?',
        'Do you have low tolerance for stressful situations, get easily irritable, and are always on edge?',
        'Does your body ache every day?',
        'Do you experience cramps in the calves at night?',
        'Do you feel tired, bored, anxious, or restless all day?',
        'Are you moody or irritable at the time of menstruation?',
        'Do you have excessive menstrual bleeding?',
        'Do you have weight gain before menstrual period?',
        'Do you have excess fat on your thighs and hips?',
        'Do you have hot flashes?',
        'Is your hair thinning and falling more?',
        'Do you have dry skin, especially on your hands and feet?',
        'Do you feel cold more than others?',
        'Do you have a history of being on low-calorie diets?',
        'Do you or anyone in your family have thyroid problems?',
        'Do you crave candy or sugary food after meals?',
        'Do you feel weak or a little shaky before meals?',
        'Does your fatigue disappear after eating?',
        'Do you or anyone in your family have diabetes?',
        'Do you want to lose weight?',
        'Is your time to go to bed, wake up in the morning, and have meals irregular?',
        'Do you have a habit of eating fast food or having meals in hotels more than twice a week?',
        'Do you sit in the same place for 5 hours or more due to your work or other activities?',
        'Do you have a habit of completing your meals in a hurry?',
        'Do you go to bed a short period of time after having your dinner?'
    ];

    const items4 = [
        'શુ રાત્રે તમને ઊંઘવામાં તકલીફ પડે છે ?',
        'શું તમને કોઇપણ જાતની તકલીફ સહન થઈ શક્તી નથી તેમજ તે સમયે ગુસ્સો આવે છે?',
        'શું આખા શરીર માં તમને રોજ દુખાવા રહ્યા કરે છે ?',
        'શું રાત્રે તમારી પગની પીંડીઓ માં દુઃખાવો રહ્યા કરે છે ?',
        'શુ તમને આખો દિવસ થાક ,કંટાળો,,ચિંતા,કે બેચેની રહ્યા કરે છે ?',
        'શુ માસિક ના સમય માં તમારાં મુડમાં ફેરફાર થાય છે ?',
        'શું તમારે માસીક વધારે આવે છે ?',
        'શું માસીક ના સમય પહેલા તમારા વજનમાં વધારો થાય છે ?',
        'શું તમારા થાઇ અને હીપ્સ ના ભાગ માં વધારે પડતી ચરબી છે ?',
        'શું રાત્રે તમને અચાનક પરસેવો વળે છે અથવા શરીર ગરમ થઇ જાય છે ?',
        'શુ તમારાં વાળ પાતળાં થઇ ગયા છે અને વધારે ઉતરે છે ?',
        'શુ તમારાં હાથ પગ ની ચામડી વધુ પડતી સુકી થઇ ગઈ છે ?',
        'શું બીજા લોકો કરતા તમને ઠંડી વધારે લાગે છે ?',
        'શું તમે વજન ઘટાડવા વારંવાર ડાયેટ કરેલો છે ?',
        'શું તમને અથવા તમારા કુટુંબમાં કોઈ ને થાઈરોઈડ છે ?',
        'શું તમને જમ્યા પછી ગળ્યું ખાવાની ખૂબ ઈચ્છા થાય છે ?',
        'શું તમને ભૂખ લાગી હોય અને જમવાનું મોડું થાય તો અશક્તિ ,અથવા ચક્કર જેવું લાગે છે ?',
        'શું જમ્યા પછી તરત જ તમારો થાક દૂર થઇ જાય છે ?',
        'શું તમને અથવા તમારા ફેમિલી માં કોઈ ને ડાયાબિટીસ છે ?',
        'શુ તમે વજન ઘટાડવા માંગો છો ?',
        'શું તમારો રાત્રે સુઈ જવાનો ,સવારે જાગવાનો કે જમવાનો સમય નિયમિત નથી ?',
        'શું તમારે અઠવાડિયા માં બે કે તેથી વધારે ટાઈમ હોટેલ માં જમવાનું કે ફાસ્ટ ફૂડ લેવાનું થાય છે ?',
        'શું તમારે એક ની એક જગ્યાએ 5 કલાક કે તેથી વધારે સમય બેસી રહેવાનું થાય છે ?',
        'શું તમારે ખૂબ ઝડપ થી જમવાની ટેવ છે ?',
        'શું તમારે રાતે જમ્યા પછી થોડા સમય માં જ સુઈ રહેવાનું થાય છે ?'
    ];

    return (
        <div>
            <header className="bg-[#FEFAF6] h-20">
                <div className=" items-center absolute p-3">
                    <img src="https://slimandsmile.com/assets/front/images/logo.png" alt="" className="h-16" />
                </div>
                <div className="flex justify-center p-3">
                    <h1 className="text-2xl text-[#1F2937] font-bold">Surveillance @ Overweight</h1>
                </div>
            </header>
            <body>
                <div className="flex items-center justify-center border px-10 py-5 rounded-sm bg-[#F6F5F2] shadow-sm">
                    <form
                        onSubmit={handleSubmit(submittedData3)}
                        className="w-[750px] p-3 flex flex-col justify-center items-center rounded-md bg-[#EEEEEE] "
                        method="post"
                    >
                        <div>
                            <h2 className="text-xl text-[#799351] font-semibold">Click the following questions, if applicable to get your closest possibility of weight gain reason</h2>
                        </div>
                        <div className="grid py-2 my-1 ">
                            <label className="text-md text-[#799351] font-medium">Please Select Your Language:</label>
                            <select
                                name="language"
                                value={language}
                                onChange={handleLanguageChange}
                                className="py-1 px-2 rounded-md border border-black w-[25rem]"
                            >
                                <option value="English">English</option>
                                <option value="Gujarati">Gujarati</option>
                            </select>
                        </div>
                        <div >
                            <label className="text-lg text-[#799351] font-semibold">Complains:</label>
                            {language === 'English' ? (
                                items3.map((item, index) => (
                                    <div key={index}>
                                        <input
                                            value={item}
                                            onChange={handleCheckboxChange3}
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`checkbox-${index}`}>{item}</label>
                                    </div>
                                ))
                            ) : (
                                items4.map((item, index) => (
                                    <div key={index}>
                                        <input
                                            value={item}
                                            onChange={handleCheckboxChange4}
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`checkbox-${index}`}>{item}</label>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className='grid grid-cols-2 gap-2 m-2'>
                                <button
                                    onClick={handleBack}
                                    type="submit"
                                    className="w-[20rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
                                    style={{ backgroundColor: '#799351' }}
                                    >
                                        Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-[20rem] p-1 text-[#1F2937] rounded-md border border-gray-500 font-bold text-lg hover:scale-105"
                                    style={{ backgroundColor: '#799351'}}
                                    >
                                        Submit
                                </button>
                            </div>
                    </form>
                </div>
                <div>
                    <Dialog
                    open={code}
                    onClose={handleCodeClose}>
                        <DialogTitle>Enter OTP</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Enter the OTP sent to your email. 
                        </DialogContentText>
                        <TextField 
                            autoFocus
                            required
                            margin="dense"
                            id="otp"
                            name="otp"
                            label="OTP"
                            type="otp"
                            fullWidth
                            onChange={handlePasscode}
                            variant="standard"
                        />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCodeClose}>Cancel</Button>
                            <Button type="submit" onClick={handlePasswordhandle}>Verify OTP</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </body>
            <footer>
                <div className="flex justify-center items-center text-center bg-[#FEFAF6] h-16">
                    <a className="text-lg text-[#799351] font-semibold" href="https://slimandsmile.com">Contact Us @ Slim And Smile</a>
                </div>
            </footer>
        </div>
    );
}
