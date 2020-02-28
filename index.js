import React, { Component, useContext } from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';

//Champion Data
const ALL_CHAMP_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json'
const FULL_CHAMP_BASE_URL ='http://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion/' //Aatrox.json

//Champion img
const SPLASH_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' //Aatrox_0.jpg
const LOADING_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' //Aatrox_0.jpg
const SQUARE_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/' //Aatrox.png
const PASSIVE_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/passive/' //Anivia_P.png
const ABILITY_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/' //FlashFrost.png


function getLeagueImage(obj, type, options = {}) {
    const SPLASH_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' //Aatrox_0.jpg
    const LOADING_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' //Aatrox_0.jpg
    const SQUARE_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/' //Aatrox.png
    const PASSIVE_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/passive/' //Anivia_P.png
    const ABILITY_BASE_URL = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/' //FlashFrost.png

    console.log(obj)

    let url

    if(type === "splash") {
        url = `${SPLASH_BASE_URL}${obj.id}_0.jpg`
        return url
    } else if(type === "loading") {
        url = `${LOADING_BASE_URL}${obj.id}_0.jpg`
        return url
    } else if(type === 'square') {
        url = `${SQUARE_BASE_URL}${obj.id}.png`
        return url
    }else if(type === 'passive') {
        url = `${PASSIVE_BASE_URL}${obj.id}_P.png`
        return url
    } else if(type ==='ability') {
        url = `${ABILITY_BASE_URL}${options.ability}.png`
    } else {
        return {
            error: 'type was not found' 
        }
    }
}

async function fetchChampionsData(url, setState) {
    let championsObj = {}
    let championsArr = []

    try {
        fetch(url)
            .then( response => 
                response.json())
            .then( json => {
                const data = json.data

                for(let name in data) {
                    fetchChampion(FULL_CHAMP_BASE_URL, name, championsObj, championsArr)
                }

               return {
                   data: championsObj,
                   champions: championsArr
               }
            }).then( obj =>{
                setState(obj)
            })   
    } catch(e) {
        console.error(e)
    }
}

async function fetchChampion(url, name, obj, arr) {
    
    const urlName = `${url}${name}.json`

    try {
        fetch(urlName)
            .then( response =>
                response.json()
            )
            .then( json => {
                obj[name] = json.data
                arr.push(json.data[name])
            })
    } catch(e) {
        console.error(e)
    }
}


class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: {},
            champions: []
        }
    }

    componentDidMount() {
        const setState = this.setState.bind(this)
        fetchChampionsData(ALL_CHAMP_BASE_URL, setState)

        setTimeout( ()=>{
            this.forceUpdate()

        }, 1500)
    }

    render() {
       let { champions } = this.state;
       let { data } = this.state; 

       console.log("champions: ",champions)
       console.log("data: ", data)


        return(
            <div>
                <ul>
                    { champions.length > 0 ? champions.map( champ => {
                        const imgSrc = getLeagueImage(champ, 'square')
                        return (
                            <li key={champ.id} >
                                <img src={imgSrc} />
                                <p>{champ.id}</p>
                            </li>
                        )
                    }) : <li>loading...</li>} 
                </ul>
            </div>
        )
       
        
        
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))