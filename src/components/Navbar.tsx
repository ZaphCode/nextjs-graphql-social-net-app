import React from 'react'
import { IUser } from '../types'

interface INavbarProps {
    user: IUser
}

const Navbar: React.FC<INavbarProps> = ({user}) => {
  return (
    <div className='w-full h-20 bg-black'>
      <h1>asd</h1>
    </div>
  )
}

export default Navbar
