import React from 'react'
import { getLeagueImage } from '../js/helpers.js'




const Champion = ({champion, onClick, id }) => {
    const { name } = champion
    
    return (
        <li className="champion-list-item"  onClick={onClick} id={id}>
            <img src={getLeagueImage(champion, 'square')} />
            <p className="item-name">{name}</p>
        </li>
    )
}



const ChampionsList = ({selectedChampions, allChampions, searchValue, fn}) => {

    return (
        <div className="champions-container">
                    <ul className="champions-list">
                        { (searchValue.length > 0) ?
                            selectedChampions.map( (champ, index) => {
                                return (
                                    <Champion   key={champ.id} 
                                                champion={champ} 
                                                onClick={fn}
                                                id={index} 
                                    />
                                 )
                            })

                            : allChampions.map( (champ, index) => {
                                return (
                                    <Champion   
                                                key={champ.id} 
                                                champion={champ}
                                                onClick={fn}
                                                id={index}
                                                
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
    )
}

export default ChampionsList