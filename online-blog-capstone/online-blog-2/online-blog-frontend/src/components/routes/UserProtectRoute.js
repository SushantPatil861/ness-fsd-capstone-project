import React from "react"
import { Navigate } from "react-router-dom"
export default function UserProtectRoute({children}) {

    const loggedInUser = sessionStorage.getItem('loggedInUser')
    return loggedInUser? children : <Navigate to="/login" />
}