//Champion Data
const ALL_CHAMP_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json'
const FULL_CHAMP_BASE_URL ='https://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion/' //Aatrox.json

const SPLASH_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' //Aatrox_0.jpg
const LOADING_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' //Aatrox_0.jpg
const SQUARE_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/' //Aatrox.png
const PASSIVE_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/10.4.1/img/passive/' //Anivia_P.png
const ABILITY_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/10.4.1/img/spell/' //FlashFrost.png

async function fetchChampionsData(setState, url = ALL_CHAMP_BASE_URL) {
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
        console.error("error: ", e)
    }
}


function getLeagueImage(obj, type, options) {
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
        url = `${PASSIVE_BASE_URL}${obj.passive.image.full}`
        return url
    } else if(type ==='ability') {
        url = `${ABILITY_BASE_URL}${options}`
        return url
    } else {
        return {
            error: 'type was not found' 
        }
    }
}

export { getLeagueImage, fetchChampion, fetchChampionsData } 