import React from 'react'
import { useNavigate } from 'react-router-dom';

const Info = ({seller}) => {
  const navigate = useNavigate();

  function handleClick(e){
    e.preventDefault();
    if(localStorage.getItem("location") === null){
      localStorage.setItem("location",JSON.stringify(seller));
    }
    else if(localStorage.getItem("location") !== null){
      localStorage.removeItem("location");
      localStorage.setItem("location",JSON.stringify(seller));
    }
    navigate('/seller/location');
  }

  return (
        <div className= 'items-center border-[3px] p-[5px] m-[6px] flex justify-evenly bg-white rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg'>
              <td className=' p-[5px] w-[100px] text-center'>{seller.name}</td>
              <td className=' p-[5px] w-[166px] text-center'>{seller.stall_type}</td>
              <div className=' bg-[#D2042D]  p-[10px] rounded-[12px] text-white text-lg font-semibold text-center cursor-pointer w-fit h-fit' onClick={handleClick}>Click here</div>
        </div>
  )
}

export default Info;