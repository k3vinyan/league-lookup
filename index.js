import React, { Component, useContext } from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import { fetchChampionsData } from './src/js/helpers.js'

//Components
import ChampionsList from './src/components/ChampionsList'
import SearchBar from './src/components/SearchBar'
import Champion from './src/components/Champion'
import Header from './src/components/header'

import './src/stylesheets/style.css'

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: {},
            champions: [],
            selectedChampions: [],
            selectedChampion: null,
            currentDescription: null,
            value: ""
            
        }

        this.filterChampions = this.filterChampions.bind(this)
        this.selectedChampionFn = this.selectedChampionFn.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        const setState = this.setState.bind(this)
        fetchChampionsData(setState)

        setTimeout( ()=>{
            this.forceUpdate()

        }, 2000)
    }

    selectedChampionFn(e) {
        const index = e.target.parentNode.id
        let selected
        

        if(this.state.value.length > 0) {
            selected = this.state.selectedChampions[index]
        } else {
            selected = this.state.champions[index]
        }

        this.setState({
            selectedChampion: selected
        })
    }


    filterChampions(e) {
        const value = (e.target.value).toLowerCase()
        const { champions } = this.state
        const regExp = new RegExp(`${value}`, 'g')
        const found = champions.filter( (champ) => {    
            const name = champ.name.toLowerCase()
            if(regExp.test(name)) {
                return champ
            }
        })
        this.setState({
            selectedChampions: found
        })
        this.setState({
            value
        })
    }

    handleSearch(e) {
        const {selectedChampion} = this.state
        
        if(selectedChampion !== null) {
            this.setState({
                selectedChampion: null
            
            })
        }

    }


    handleInputChange(e) {
        this.filterChampions(e)
        this.handleSearch(e)

    }

    render() {
       let { champions, selectedChampions, selectedChampion, value } = this.state;

        return(
            <main>

                <Header title="Choose your Champion" />
                <SearchBar onChange={this.handleInputChange}/>
                {selectedChampion === null ?
                    <ChampionsList  
                        selectedChampions={selectedChampions} 
                        searchValue={value} 
                        allChampions={champions}
                        fn = {this.selectedChampionFn}
                    />
                    :
                    <Champion champion={selectedChampion} />
                }
            </main>
            
        )
       
        
        
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))