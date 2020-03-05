import React from 'react'
import { getLeagueImage } from '../js/helpers.js'

const Stats = ({ champion }) => {
    const { info: { attack, defense, magic, difficulty } } = champion

    const styleType = (value) => {
        const style = {
            gridColumnEnd: (value +1)
        }

        return style
    }

    return (
        <section className="border stats-container">
            <h2>Stats</h2>
            <div className="grid-container">
                <div className="grid-item"><p>Attack</p></div>
                <div className="attack-item test" style={styleType(attack)}>{attack}</div>
                <div className="grid-item"><p>Defense</p></div>
                <div class="defense-item test" style={styleType(defense)}>{defense}</div>
                <div className="grid-item"><p>Magic</p></div>
                <div className="magic-item test" style={styleType(magic)}>{magic}</div>
                <div className="grid-item"><p>Difficulty</p></div>
                <div class="difficulty-item test" style={styleType(difficulty)}>{difficulty}</div>
           </div>
        </section>
    )
}


const Lore = ( { champion } ) => {
    const { lore } = champion

    return (
        <section className="lore-container border">
            <h2>Lore</h2>
            <p>{lore}</p>
        </section>
    )
}

const Description = ( { activeSpell } ) => {
    const { name, description } = activeSpell

    return (
        <section className="description-container">
            <div className="border">
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
                
        </section>
    )
}

const Passive = ( {champion, onClick, active=false} ) => {
    const { passive } = champion

    return active ?
    (
        <div className="passive-container active"  onClick={ () => onClick(passive)}>
            <p><i>Passive</i></p>
            <img src={getLeagueImage(champion, 'passive')} />
            <h2>{passive.name}</h2>
        </div>
    )
    :
    (
        <div className="passive-container"  onClick={ () => onClick(passive)}>
            <p><i>Passive</i></p>
            <img src={getLeagueImage(champion, 'passive')} />
            <h2>{passive.name}</h2>
        </div>
    )
}

const Spell = ( {spell, keybind, onClick, active=false })  => {
    const { name} = spell


    return active ?
    (
        <div className="single-spell-container active" onClick={() => onClick(spell)} >
            <p><i>{keybind}</i></p>
            <img className="active" src={getLeagueImage(null, 'ability', spell.image.full)} />
            <h2>{name}</h2>
        </div>
    )
    :
    <div className="single-spell-container" onClick={() => onClick(spell)} >
        <p><i>{keybind}</i></p>
        <img src={getLeagueImage(null, 'ability', spell.image.full)} />
        <h2>{name}</h2>
</div>
}

const SpellSet = ({champion, handleSpellSelect, activeSpell}) => {
    const { spells } = champion 
    const {passive: {name }} = champion


    const keybinds = ['Q', 'W', 'E', 'R']


    return (
        <section className="spells-list-container">
            <ul className="spells-list border">
                <li>
                    <Passive 
                        champion={champion} 
                        onClick={handleSpellSelect}
                        active={ name === activeSpell.name} />
                </li>

                { spells.map( (spell, i) => {
                    return(
                        <li key={spell.id}>
                            <Spell      
                                spell={spell} 
                                keybind={keybinds[i]} 
                                onClick={handleSpellSelect}
                                active={ spell.name === activeSpell.name}
                            />
                        </li>
                   
                    )
                })}
            </ul>
        </section>
    )
}

const ChampionCard = ( { champion } ) => {
    const { name, title } = champion

    return (
        <div className="champion-image-container border">
            <div className="champion-name-container">
                <h1 className="champion-name">{name}</h1>
            </div>
            <img src={getLeagueImage(champion, 'loading')} />

            <div className="champion-title-container">
                <h2 className="">{title}</h2>
            </div>
        </div>
    )
}


const ChampionSelect = ({champion = null, handleSpellSelect, activeSpell}) => {
    return champion != null ?
     (
        <div className="champion-container">
            <ChampionCard champion={champion} />
            <div className="champion-spell-container">
                <SpellSet 
                    champion={champion} 
                    activeSpell={activeSpell}
                    handleSpellSelect={handleSpellSelect} 
                    activeSpell={activeSpell}
                />
                 <Description activeSpell={activeSpell} />
                <section className="champion-info-container">
                    <Stats champion={champion} />
                    <Lore champion={champion} />
                </section>
            </div>
        </div>
    )
    :
    (
        <div>Champion is Loading..</div>
    )
   
}

export default ChampionSelect