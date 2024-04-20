import React from 'react'

import { Navigate } from 'react-router-dom'
function Protected({children}) {
    const userdata=localStorage.getItem('user')

 const user=JSON.parse(userdata)

  if (user==null) {
    return <Navigate to="/login"  />
  }
  return children
}
export default Protected