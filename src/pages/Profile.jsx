import { useState } from 'react'

const Profile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [userMessage, setUserMessage] = useState({});

  const handleNameChange = (e) => {
    const userName = e.target.value.trim().toLowerCase();
    setName(userName);
  }

  const handleEmailChange = (e) => {
    const emailId = e.target.value.trim().toLowerCase();
    setEmail(emailId);
  }

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
        setUserMessage({userMsg: "You have registered with name and email address."});
    }
  }
  

  return (
    <div className='min-h-[calc(100vh-150px)] flex flex-col justify-center items-center gap-14'>
      <h1 className='text-5xl font-medium mb-3'>Profile</h1>
      <form className='flex flex-col w-96'>
        <p className={`text-xl ${isError ? "text-Error" : "text-Heading"} font-semibold mb-4`}>Enter your name</p>
        <input 
          type="text" 
          placeholder="Name" 
          onChange={handleNameChange}
          className='w-full h-16 text-xl font-normal border border-[#9CA3AF] px-3 py-2 rounded-lg mb-4' 
        />
         {userMessage?.nameErr && <p className='text-Error text-base font-semibold w-full'>{userMessage.nameErr}</p>}
        <p className={`text-xl ${isError ? "text-Error" : "text-Heading"} font-semibold mb-4`}>Enter your email-id</p>
        <input 
          type='text' 
          placeholder='Email' 
          onChange={handleEmailChange}
          className='w-full h-16 text-xl font-normal border border-[#9CA3AF] px-3 py-2 rounded-lg mb-4' 
        />
        {userMessage?.emailErr && <p className='text-Error text-base font-semibold w-full'>{userMessage.emailErr}</p>}
        <button 
          onClick={handleSubmit}
          disabled={!(name.length > 1 && validateEmail(email))}
          className={`${(name.length > 1 && validateEmail(email)) ? "bg-Primary" : "bg-Inactive"} text-[18px] font-semibold text-white px-6 py-3 rounded-lg self-end`}>Submit</button>
      </form>
      {userMessage?.userMsg && <p className='text-Success text-xl font-semibold'>{userMessage.userMsg}</p>}
    </div>
  )
}

export default Profile