import React from 'react'
import { Link } from 'gatsby'
import headerStyles from '../styles/header.module.scss'
import Logo from './logo.js'
//import center from '../styles/centering.module.scss'

const Header = () => {
    return (
        <header className={headerStyles.headerBar}>
            <div className={headerStyles.headerImg}>               
                <Logo/>
            </div>
            <div className={headerStyles.title}>
                COUNTERACTIVE SCO
            </div>
            <nav className={headerStyles.nav}>
                <span className={headerStyles.navBtn}><Link className={headerStyles.link} to='/'>Home</Link></span>
                <span className={headerStyles.navBtn}><Link className={headerStyles.link} to='/mappings'>Mappings</Link></span>
                <span className={headerStyles.navBtn}><Link className={headerStyles.link} to='/frameworks'>Frameworks</Link></span>
            </nav>
        </header>
    )
}

export default Header