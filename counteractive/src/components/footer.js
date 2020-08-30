import React from 'react'
import footerStyles from '../styles/footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
        <div className={footerStyles.footer}>
            <div className={footerStyles.title}>COUNTERACTIVE SCO</div>
            <div className={footerStyles.links}>
                <div className={footerStyles.contactUs}>
                    <div className={footerStyles.contactTitle}>Contact Us</div>
                    <div className={footerStyles.contactContent}>(888) 925-5765</div>
                    <div className={footerStyles.contactContent}>contact@counteractive.net</div>
                </div>
                <div className={footerStyles.followUs}>
                    <div className={footerStyles.followUsTitle}>Follow Us</div>
                    <a className={footerStyles.followUsContent1} href=""><FontAwesomeIcon icon={faTwitterSquare} /></a>
                    <a className={footerStyles.followUsContent2} href=""><FontAwesomeIcon icon={faGithubSquare} /></a>                    
                </div>
            </div>
            <div className={footerStyles.bottom}>
                <div className={footerStyles.copyright}>© 2020 Counteractive Security Security Veterans Alliance Member</div>
            </div>
        </div>
    )
}

export default Footer