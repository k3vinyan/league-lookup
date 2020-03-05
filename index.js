import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'

//helpers
import { fetchChampionsData } from './src/js/helpers.js'
import { getLeagueImage } from './src/js/helpers.js'

//Components
import ChampionsList from './src/components/ChampionsList'
import SearchBar from './src/components/SearchBar'
import ChampionSelect from './src/components/ChampionSelect'
import Header from './src/components/Header'

//stylesheet
import './src/stylesheets/style.css'

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: {},
            champions: [],
            selectedChampions: [],
            activeSpell: null,
            currentChampion: null,
            value: ""
    
        }

        this.filterChampions = this.filterChampions.bind(this)
        this.handleChampionSelect = this.handleChampionSelect.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSpellSelect = this.handleSpellSelect.bind(this)
    }

    componentDidMount() {
        const setState = this.setState.bind(this)
        fetchChampionsData(setState)

        setTimeout( ()=>{
            this.forceUpdate()

        }, 2000)
    }

    handleChampionSelect(e) {
        const index = e.target.parentNode.parentNode.id
        let selected

        if(this.state.value.length > 0) {
            selected = this.state.selectedChampions[index]
        } else {
            selected = this.state.champions[index]
        }

        this.setState({
            currentChampion: selected,
            activeSpell: {
                name: selected.passive.name,
                description: selected.passive.description
            }
        })
    }


    filterChampions(e) {
        const value = (e.target.value).toLowerCase()
        const { champions } = this.state
        const regExp = new RegExp(`${value}`, 'g')

        const selectedChampions = champions.filter( (champ) => {    
            const name = champ.name.toLowerCase()
            if(regExp.test(name)) {
                return champ
            }
        })

        this.setState({
            selectedChampions
        })

        this.setState({
            value
        })
    }

    handleSearch() {
        const {currentChampion} = this.state
        
        if(currentChampion !== null) {
            this.setState({
                currentChampion: null
            
            })
        }

    }

    handleSpellSelect({name, description}) {
        this.setState({
            activeSpell: {
                name, 
                description
            }
        })
    }

  
    handleInputChange(e) {
        this.filterChampions(e)
        this.handleSearch(e)

    }

    render() {
       const { champions, selectedChampions, currentChampion, value, activeSpell } = this.state
        
        let background ={
            background: 'black'
        }

       if(currentChampion != null) {
        const url = getLeagueImage(currentChampion, 'splash')
       
        background = {
            backgroundImage: `url(${url})`
        }
       }

       const title = "league of Legend"
       const para = "With more than 140 champions, you’ll find the perfect match for your playstyle. Master one, or master them all."
       const mainTitle = "Champions"

        return(
            <main className="main-container">
                <Header title={title} mainTitle={mainTitle} para={para} />
                <SearchBar onChange={this.handleInputChange}/>
                <section className="main-content border" style={background}>
                    {currentChampion === null ?
                        <ChampionsList  
                            selectedChampions={selectedChampions} 
                            searchValue={value} 
                            allChampions={champions}
                            handleChampionSelect = {this.handleChampionSelect}
                            handleSpellSelect={this.handleSpellSelect}
                        />
                        :
                        <ChampionSelect   
                            champion={currentChampion} 
                            activeSpell={activeSpell} 
                            handleSpellSelect={this.handleSpellSelect}
                        />
                    }
                </section>
            </main>
            
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))