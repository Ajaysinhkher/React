import React from 'react'
import { useParams } from 'react-router'

function User() {

    const {userId} = useParams()
  return (
    <div>
      <h1 className='text-white-700 bg-cyan-600 font-bold text-2xl'>User Id: {userId}</h1>
    </div>
  )
}

export default User
