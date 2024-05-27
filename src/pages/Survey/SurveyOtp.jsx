import React, { useState ,useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function SurveyOtp(){
    const [code,setCode]  = React.useState(true);
    const handleCodeClose = () =>{
        setCode(false);
      }
      const handlePasscode = (e) =>{
        setPasscode(e.target.value);
    }
    const isPasswordValid = (password) =>{
        const passwordRegex = /^[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }
    const handlePassword = (e) =>{
        const newpassword= e.target.value;
        setPass(newpassword);
    
        if (!isPasswordValid(newpassword)) {
            
            console.error("Password does not meet the criteria");
          }
    }
    const handlePasswordopen = () =>{
        
      }
    return(
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
                   <Button type="submit" onClick={handlePasswordopen}>Verify OTP</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}