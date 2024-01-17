/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/lib/context/AuthContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRouteWrapper({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const navigate = useNavigate()
    
       if (!user) {
        navigate('/auth/login')
    } 

    return (
        <>{children}</>
  )
}