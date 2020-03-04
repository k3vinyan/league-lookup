import React from 'react'
import { getLeagueImage } from '../js/helpers.js'



const Stats = ( {info} ) => {
    const { attack , defense, magic, difficulty } = info

    return ( 
        <div className="container">
                <h2>Stats</h2>
                <p>Attack: {attack}</p>
                <p>Defense: {defense}</p>
                <p>Magic: {magic}</p>
                <p>difficulty: {difficulty}</p> 
        </div>
    )
    
}

const Passive = ( {champion} ) => {
    const { passive } = champion

    return (
        <div className="container center">
            <p>Passive</p>
            <img className="" src={getLeagueImage(champion, 'passive')} />
            <h1 className="" >{passive.name}</h1>
            <p>{passive.description}</p>
        </div>
    )
}


const Spell = ( {spell, keybind="dog"})  => {
    const { name, description } = spell

    return (
        <div className="container center">
            <p>{keybind}</p>
            <img src={getLeagueImage(null, 'ability', spell.image.full)} />
            <h2>{name}</h2>
            <p className="">{description}</p>
            {/* <p>{tooltip}</p> */}
        </div>
    )
}

const SpellSet = ({champion}) => {
    const { spells } = champion 
    const keybinds = ['Q', 'W', 'E', 'R']

    return (
        <ul className="container list">
            <li>
                <Passive champion={champion} />
            </li>

            { spells.map( (spell, i) => {
                return(
                    <li key={spell.id}>
                         <Spell  spell={spell} keybind={keybinds[i]} />
                    </li>
                   
                )
            })}
        </ul>
        
    )
}

const Lore = ({champion}) => {
    const { lore } = champion
    return (
        <div className="container">
            {lore}
        </div>
    )
}

const Description = ({description}) => {
    
    return (
        <div className="container">
            <p>{description}</p>
        </div>
    )
}



const Champion = ({champion = null }) => {
    return champion != null ?
     (
        <div className="main-container">

            <div className="column">
                <img src={getLeagueImage(champion, 'loading')} />
            </div>

            <div className="column">
                <div className="row">
                    <SpellSet champion={champion} />
                    <Description />
                </div>
                <div className="row">
                    <Stats info={champion.info} />
                    <Lore champion={champion} />
                </div>
            </div>

        </div>
    )
    :
    (
        <div>Champion Loading..</div>
    )
   
}

export default Champion