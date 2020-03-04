import React from 'react'

const SearchBar = ({handleInputChange}) => {


    return(
        <div className="search-container">
            <input className="search-input" type="text" placeholder="Search Champion..." onChange={handleInputChange} />
        </div>
    )
}



export default SearchBar