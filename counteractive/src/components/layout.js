import React from 'react'
import Header from './header'
import Footer from './Footer'
import layoutStyles from '../styles/layout.module.scss'
import '../styles/index.scss'

const Layout = (props) => {
    return (
        <div className={layoutStyles.wrapper}>
            <Header/>
            <div className={layoutStyles.content}>
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;