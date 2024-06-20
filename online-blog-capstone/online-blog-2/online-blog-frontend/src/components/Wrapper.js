import React from 'react';
import './common.css';
import HeaderComponent from './Header'
import FooterComponent from './Footer'

export default function WrapperComponent({children}) {

    return(
        <div className="flexLayout">
            <div><HeaderComponent /></div>
            <div>{children}</div>
            <div><FooterComponent /></div>
        </div>
    )
}