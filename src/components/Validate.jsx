import React,{useState} from 'react'
import Login from './Login';
import Signup from './Signup';

const Validate = () => {
  const [login,setLogin] = useState(true);

  function handleChange(e){
    e.preventDefault();
    setLogin(!login);
  }
  return (
    <div className='relative flex justify-center items-center h-[100vh] '>
        <div className='flex tablet:flex-row flex-col justify-center items-center '>
          
              <div className='both-main'>
              {
                login?
                <div className='tablet:flex flex-row'>
                <Login />
                <div className=' bg-black tablet:h-full w-full h-0.5 tablet:w-0.5 rounded-lg'></div>
                        <div className='tem-main'>
                        <button className="button" type="submit" onClick={handleChange}>SIGN UP</button>
                </div>
                
                </div>:<div className='tablet:flex flex-row justify-center items-center'>
                  <div className='tem-main'>
                  <button className="button" type="submit" onClick={handleChange}>SIGN IN</button>
                  </div>
                  <div className= 'bg-black tablet:h-full w-full h-0.5 tablet:w-0.5 rounded-lg'></div>
                <Signup />
                </div>
              }

              </div>
          
        </div>
  </div>
  )
}

export default Validate;