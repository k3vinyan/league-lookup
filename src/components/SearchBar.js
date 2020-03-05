import React from 'react'

const SearchBar = ({onChange}) => {

    return(
        <div className="search-container">
            <input className="search-input" type="text" placeholder="Search Champion..." onChange={onChange} />
        </div>
    )
}



export default SearchBar