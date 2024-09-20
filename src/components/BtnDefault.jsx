import React from 'react'

const BtnDefault = ({text, onClick}) => {
  return (
    <button onClick={onClick} className='rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 px-8 py-1.5'>
        {text}
    </button>
  )
}

export default BtnDefault
