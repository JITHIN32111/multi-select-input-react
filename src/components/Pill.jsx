import React from 'react';

function Pill({ image, text, onclick }) {
  return (
    <span onClick={onclick} className='flex ml-2  flex-row h-[20px] items-center bg-black p-4 rounded-3xl cursor-pointer'>
      <img className='h-5' src={image} alt='' />
      <span className='text-white'>{text} &times;</span>
    </span>
  );
}

export default Pill;
