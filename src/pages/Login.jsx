/* This is login page of the app. It contains a form where the user can enter their mobile number to receive an OTP for authentication. */
import { v4 as uuidv4 } from 'uuid';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [mobileNumber, setMobileNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Functon to validate mobile number 
  const validateMobileNumber = (number) => {
    const mobileNumberRegex = /^[6-9]\d{9}$/;
    return mobileNumberRegex.test(number);
  }

  // Handle change in mobile number input field
  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    // Check if the value is a number
    if(!/\D/.test(value)) {
      setMobileNumber(value);
    }
  }
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsError(false);

    // Validate mobile number
    if(!validateMobileNumber(mobileNumber)) {
      setIsError(true);
      setError("Invalid mobile number detected. Please enter a valid phone number.");
      return;
    } 

    // generate OTP and send to the user mobile number
    try {
      const response = await fetch("https://api.paraheights.com/paraheights-api/otp/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "uuid": uuidv4()
          },
          body: JSON.stringify({
            mobile: mobileNumber,
            "reason": "Paraheights Authentication"
          })
      });

      const result = await response.json();

      if(result.success) {
        navigate("/verifyotp", {state: {mobileNumber: mobileNumber}});
        } else {
        setIsError(true);
        setError("Invalid mobile number detected. Please enter a valid phone number.");
      }
    } catch (error) {
      console.error(error, "API request failed");
      setIsError(true);
      setError("Something went wrong. Please try again.");
    }
  }

  
  return (
    <div className='min-h-[calc(100vh-150px)] flex justify-center items-center'>
      <form className='flex flex-col w-96 sm:p-0 px-8'>
        <h1 className='sm:text-5xl text-3xl text-center font-Montserrat font-medium mb-14'>Login</h1>
        <p className={`font-semibold font-SegoeUI sm:text-xl text-base ${isError ? "text-Error" : "text-Heading"} mb-3`}>Enter your mobile number</p>
        <input 
          type="text" 
          value={mobileNumber} 
          onChange={handleMobileNumberChange} 
          placeholder="Mobile number" 
          maxLength={10} 
          required 
          className='sm:text-[22px] text-base outline-none border px-6 w-full sm:h-16 h-12 rounded-lg tracking-wider' 
        />
        {isError && <p className='text-Error sm:text-[18px] text-base font-semibold font-SegoeUI w-full'>{error}</p>}
        <button 
          onClick={handleSubmit} 
          disabled={mobileNumber.length !== 10} 
          className={`${mobileNumber.length === 10 && !isError ? "bg-Primary hover:scale-105" : "bg-Inactive"} text-base sm:text-xl font-semibold font-SegoeUI sm:px-6 sm:py-3 px-4 py-2 rounded-lg mt-4 self-end`}>Submit</button>
      </form>
    </div>
  )
}

export default Login