import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

import logoImg from '../../images/logo.png'
import homeIcon from '../../images/homeIcon.png'
import pinIcon from '../../images/pinIcon.png'

export default function sidebar() {
    return <div className="sidebar">
        <div className="sidebarTitle">
            <img src={logoImg} width='60px' height='60px' />
            <h1 className="sidebarTitleText">DAW</h1>
        </div>
        <h3 className="sidebarGeneral">General</h3>
        <nav className="sidebarList">
            <Link to="/home" className="sidebarLink">
                <div className="sidebarListItem">
                    <img src={homeIcon} width='25px' height='25px' />
                    <text className="sidebarListItemText">Home</text>
                </div>
            </Link>
            <Link to="/pinned" className="sidebarLink">
                <div className="sidebarListItem">
                    <img src={pinIcon} width='25px' height='25px' />
                    <text className="sidebarListItemText">Pinned Message</text>
                </div>
            </Link>
        </nav>
    </div>
}