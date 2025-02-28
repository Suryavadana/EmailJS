import React , { useState, useRef }from 'react'
import { Button , TextField, Box, Typography} from '@mui/material';
import emailjs from '@emailjs/browser';



const Form = () => {
    const [data,setData]=useState({
        subject :'',
        email :'',
        message :''
});

const form = useRef();

//Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//check validation
const validateForm=()=>{
    //check if all fields are filled
    if(!data.subject || !data.email || !data.message){
        alert('All fields are required!');
        return false;
    }
    //check if the email is valid
    if(!emailRegex.test(data.email)){
        alert('Please enter a valid email address!');
        return false;
    }
    return true;
};

const ChangeHandler= (e)=>{
    setData({...data,[e.target.name]:e.target.value})

}

const submitHandler = (e)=>{
    e.preventDefault();
    //validate form
    if(!validateForm()) return;
    //send form data via emailjs
    emailjs
      .sendForm('service_id','template_id', form.current,'publickey') 
       //copy paste service id, template id and public key from the emailjs website. 
      .then(
        () => {
          alert('Form Submitted SUCCESSFULLY!');
        },
        (error) => {
          alert('FORM SUBMISSION FAILED...', error.text);
        },
      );
      console.log('Form Submitted:' , data);
      //reset form fields after submission
      e.target.reset();
      // Optionally, clear the state if desired:
    // setData({ subject: '', email: '', message: '' });
  };
 
   


  return (
   
        <Box
            sx={{
                backgroundColor: 'white',
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                width: 400,
                maxWidth: '100%',
            }}
        >
        <Typography variant='h5' gutterBottom align='center'>Contact Form</Typography>
        <form ref={form} onSubmit={submitHandler}>
            <TextField
                label="Subject"
                name="subject"
                value={data.subject}
                onChange={ChangeHandler}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={ChangeHandler}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Message"
                name="message"
                value={data.message}
                onChange={ChangeHandler}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Submit</Button>
        </form>
        </Box>
  );

};
export default Form
