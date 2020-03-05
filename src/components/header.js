import React from 'react'

const Header = ({title, mainTitle, para}) => {
    return(

        <header className="header-container">
            <h2>{title}</h2>
            <h1>{mainTitle}</h1>
            <p>{para}</p>
        </header>
    )
}

export default Header