/* This is verifyOtp page component where user enters the otp. */
import {useRef, useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [submitButtonState, setSubmitButtonState] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get mobile number from location state. If mobile number not present then navigate to login page
  useEffect(() => {
    const mobileNumber = location.state?.mobileNumber;
    if(mobileNumber) {
      setMobileNumber(mobileNumber);
    } else {
      navigate("/login");
    }
  }, [mobileNumber, navigate]);
  

  // Handle change in otp input fields
  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // shift focus on next input
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      // check if all fields are filled and change the state of the submit button
      if (newOtp.includes("")) {
        setSubmitButtonState(false);
      } else {
        setSubmitButtonState(true);
      }
    }
  };

  // Handle backspace key press to move back focus
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  // Handle OTP submission
  const onOtpSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setError("");
    // API call to verify OTP
    try {
      const response = await fetch("https://api.paraheights.com/paraheights-api/otp/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "uuid": "bad7658f-243c-4d46-b697-932c03f4ff80"
          },
          body: JSON.stringify({
            mobile: mobileNumber,
            otp: otp.join("")
          })
      });

      const result = await response.json();
      if(result.success) {
        navigate("/profile", {state: {mobileNumber: mobileNumber}});
      } else {
        setIsError(true);
        setError("Invalid OTP. Please double-check and try again.");
        setSubmitButtonState(false);
      }
    } catch (error) {
        console.error(error, "Request failed");
        setIsError(true);
        setError("Something went wrong. Please try again.");
        setSubmitButtonState(false);
    }
  };

  return (
    <div className='min-h-[calc(100vh-150px)] flex flex-col items-center justify-center'>
      <h1 className='sm:text-5xl text-3xl font-Montserrat font-medium text-Heading mb-14'>OTP</h1>
      <form className='flex flex-col px-4'>
        <p className={`${isError ? "text-Error" : "text-Heading"} font-semibold font-SegoeUI sm:text-xl text-base mb-4`}>Enter the OTP sent to your mobile</p>
        {/* Input field for OTP */}
        <div>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={e => handleChange(e.target.value, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              ref={el => inputRefs.current[index] = el}
              className={`w-10 h-10 text-xl py-2 sm:w-16 sm:h-16 sm:text-4xl text-center border outline-none ${index === 0 && "rounded-l-lg"} ${index === 5 && "rounded-r-lg"} `}
            />
          ))}
        </div>
        <div className='max-w-60 sm:max-w-96'>
          {isError && <p className='text-Error sm:text-[18px] text-base font-semibold font-SegoeUI w-full'>{error}</p>}
        </div>
        <button
          onClick={onOtpSubmit}
          disabled={!submitButtonState}
          className={`sm:px-6 sm:py-3 px-4 py-2 font-semibold font-SegoeUI sm:text-xl text-base mt-4 text-Secondary 
            ${submitButtonState ? "bg-Primary hover:scale-105" : "bg-Inactive"} rounded-lg self-end`}
        >Submit</button>
      </form>
    </div>
  )
}

export default VerifyOtp