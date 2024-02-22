import React from 'react'

const navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-700 text-white py-2">
        <div className="logo">
            <span className='font-bold text-xl mx-9'>itsak</span>
        </div>
      <ul className="flex gap-5 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all '>Your tasks</li>
      </ul>
    </nav>
  )
}

export default navbar
