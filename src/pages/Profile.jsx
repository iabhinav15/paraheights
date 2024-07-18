/* This is profile creation page component. Using name and email user can create their profile. */
import { useState } from 'react'
import checkMark from '../assets/checkmark.png';

const Profile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [userMessage, setUserMessage] = useState({});

  // Handle change in name input field
  const handleNameChange = (e) => {
    const userName = e.target.value.trim().toLowerCase();
    setName(userName);
  }

  // Handle change in email input field
  const handleEmailChange = (e) => {
    const emailId = e.target.value.trim().toLowerCase();
    setEmail(emailId);
  }

  // Function to validate email
  const validateEmail = (email) => {
    const emailValidaorRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailValidaorRegex.test(email);
  }

  // Create profile
  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.length < 2 || !validateEmail(email)) {
      if(name.length < 2) {
        setIsError(true);
        setUserMessage({...userMessage, nameErr: "Name must be at least 2 characters."});
        setName("");
        setEmail("");
      } 
      if(!validateEmail(email)) {
        setIsError(true);
        setUserMessage({...userMessage, emailErr: "Invalid Email: Please enter a valid email address."});
        setEmail("");
        setName("");
      } 
      return;
    } else {
        setIsError(false);
        setUserMessage({userMsg: "You have already registered with this name and email address."});
    }
  }
  

  return (
    
    <div className='min-h-[calc(100vh-150px)] flex justify-center items-center gap-14'>
      <form className='flex flex-col w-96 sm:p-0 px-8'> 
        <h1 className='sm:text-5xl text-3xl text-center font-Montserrat font-medium mb-14'>Profile</h1>
        <p className={`sm:text-xl text-base ${isError ? "text-Error" : "text-Heading"} font-semibold font-SegoeUI mb-3`}>Enter your name</p>
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={handleNameChange}
          className='w-full sm:h-16 h-12 sm:text-xl text-base font-normal outline-none border border-[#9CA3AF] px-3 py-2 tracking-wider rounded-lg mb-8' 
        />
        {userMessage?.nameErr && <p className='text-Error sm:text-base text-xs font-semibold font-SegoeUI w-full'>{userMessage.nameErr}</p>}
        <p className={`sm:text-xl text-base  ${isError ? "text-Error" : "text-Heading"} font-semibold font-SegoeUI mb-3`}>Enter your email-id</p>
        <input 
          type='text' 
          placeholder='Email' 
          value={email}
          onChange={handleEmailChange}
          className='w-full sm:h-16 h-12 sm:text-xl text-base  font-normal border border-[#9CA3AF] px-3 py-2 rounded-lg mb-4' 
        />
        {userMessage?.emailErr && <p className='text-Error text-base font-semibold font-SegoeUI w-full'>{userMessage.emailErr}</p>}
        <button 
          onClick={handleSubmit}
          disabled={!(name.length > 1 && validateEmail(email))}
          className={`${(name.length > 1 && validateEmail(email)) ? "bg-Primary hover:scale-105" : "bg-Inactive"} sm:text-[18px] text-base font-semibold font-SegoeUI text-white sm:px-6 sm:py-3 px-4 py-2 rounded-lg self-end `}>Submit</button>
        {/* Display registration successful message to user */}
        {userMessage?.userMsg && <p className='max-w-96 text-Success sm:text-xl text-base font-semibold font-SegoeUI flex flex-col justify-center items-center p-8'>
          {userMessage.userMsg}
          <img width="18" height="18" src={checkMark} alt="" />
          </p>
        }
      </form>
    </div>
  )
}

export default Profile