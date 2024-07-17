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

  useEffect(() => {
    const mobileNumber = location.state?.mobileNumber;
    if(mobileNumber) {
      setMobileNumber(mobileNumber);
    } else {
      navigate("/login");
    }
  }, [mobileNumber, navigate]);
  


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

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onOtpSubmit = async(e) => {
    e.preventDefault();
    setIsError(false);
    setError("");
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
      console.error(error, "API request failed");
      setIsError(true);
      setError("Something went wrong. Please try again.");
      setSubmitButtonState(false);
   }
  };

  return (
    <div className='min-h-[calc(100vh-150px)] flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-medium text-Heading mb-14'>OTP</h1>
      <form className='flex flex-col'>
        <p className={`${isError ? "text-Error" : "text-Heading"} font-semibold text-xl mb-4`}>Enter the OTP sent to your mobile</p>
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
              className={`w-16 h-16 text-4xl text-center border outline-none ${index === 0 && "rounded-l-lg"} ${index === 5 && "rounded-r-lg"} `}
            />
          ))}
        </div>
        {isError && <p className='text-Error text-[18px] font-semibold w-full'>{error}</p>}
        <button
          onClick={onOtpSubmit}
          disabled={!submitButtonState}
          className={`px-6 py-3 font-semibold text-[18px] mt-4 text-white 
            ${submitButtonState ? "bg-Primary" : "bg-Inactive"} rounded-lg self-end`}
        >Submit</button>
      </form>
    </div>
  )
}

export default VerifyOtp