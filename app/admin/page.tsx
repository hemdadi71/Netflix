import React from 'react'
import Form from '../components/Form'
import getCurrentUser from '../actions/getCurrentUser'
import UserRole from '../components/UserRole'

const Admin = async () => {
  const currentUser = await getCurrentUser()
  if (currentUser?.role === 'user') {
    return <UserRole />
  }
  return (
    <div className="flex items-center justify-center relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Form />
    </div>
  )
}

export default Admin
