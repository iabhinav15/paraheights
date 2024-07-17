import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [mobileNumber, setMobileNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateMobileNumber = (number) => {
    const mobileNumberRegex = /^[6-9]\d{9}$/;
    return mobileNumberRegex.test(number);
  }
  

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsError(false);
    
    if(!validateMobileNumber(mobileNumber)) {
      setIsError(true);
      setError("Invalid mobile number detected. Please enter a valid phone number.");
      return;
    } 
    
   try {
     const response = await fetch("https://api.paraheights.com/paraheights-api/otp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "uuid": "bad7658f-243c-4d46-b697-932c03f4ff80"
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
      <form className='flex flex-col w-96'>
        <h1 className='text-5xl text-center font-medium mb-14'>Login</h1>
        <p className={`font-semibold text-xl ${isError ? "text-Error" : "text-Heading"} mb-2`}>Enter your mobile number</p>
        <input 
          type="text" 
          value={mobileNumber} 
          onChange={handleMobileNumberChange} 
          placeholder="Mobile number" 
          maxLength={10} 
          required 
          className='text-[22px] outline-none border px-4 w-[384px] h-[64px] rounded-lg tracking-wider' 
        />
        {isError && <p className='text-Error text-[18px] font-semibold w-full'>{error}</p>}
        <button 
          onClick={handleSubmit} 
          disabled={mobileNumber.length !== 10} 
          className={`${mobileNumber.length === 10 && !isError ? "bg-Primary" : "bg-Inactive"} text- text-[18px] font-semibold px-6 py-3 rounded-lg mt-4 self-end`}>Submit</button>
      </form>
    </div>
  )
}

export default Login