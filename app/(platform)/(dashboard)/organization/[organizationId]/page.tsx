import { auth } from '@clerk/nextjs'
import React from 'react'

const OrganizationIdPage = () => {

   const { userId, orgId } = auth()

  return (
    <div>  
       Organization
    </div>
  )
}

export default OrganizationIdPage