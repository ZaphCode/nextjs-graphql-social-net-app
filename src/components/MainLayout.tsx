import React from 'react'
import { authUser } from '../types'
import Navbar from './Navbar'

interface ILayoutProps {
  user: authUser
}

const Layout: React.FC<ILayoutProps> = ({children, user}) => {
  return (
    <>
      <Navbar user={user}/>
      <div className='container'>
        {children}
      </div>
    </>
  )
}

export default Layout
