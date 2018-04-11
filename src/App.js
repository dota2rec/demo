import React, { Component } from 'react';
import './App.css';
import HeroSlot from './HeroSlot';

class App extends Component {
    constructor() {
        super();
        this.state = {
            teamHeroSelections: [null, null, null, null, null],
            enemyHeroSelections: [null, null, null, null, null],
        };
    }

    componentWillMount() {
        const selectionState = {};
        const storedTeamHeroStr = localStorage.getItem('teamHeroSelections');
        if (storedTeamHeroStr) {
            selectionState.teamHeroSelections = JSON.parse(storedTeamHeroStr);
        }
        const storedEnemyHeroStr = localStorage.getItem('enemyHeroSelections');
        if (storedEnemyHeroStr) {
            selectionState.enemyHeroSelections = JSON.parse(storedEnemyHeroStr);
        }

        this.setState(selectionState);
    }

    render() {
        const { teamHeroSelections, enemyHeroSelections } = this.state;
        const teamHeroSlots = [];
        const enemyHeroSlots = [];

        for (let i = 0; i < 5; i++) {
            teamHeroSlots.push(
                <HeroSlot
                    key={`team-hero-${i}`}
                    team={'team'}
                    index={i}
                    selectedHero={teamHeroSelections[i]}
                    onHeroSelected={this.handleHeroSelected.bind(this)} />
            );
            enemyHeroSlots.push(
                <HeroSlot
                    key={`enemy-hero-${i}`}
                    team={'enemy'}
                    index={i}
                    selectedHero={enemyHeroSelections[i]}
                    onHeroSelected={this.handleHeroSelected.bind(this)} />
            );
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">D2Rec - Dota Item Recommendation System</h1>
                </header>
                <div className="container">
                    <div className="container-background" style={{ backgroundImage: "url('./images/bg-small.jpg')" }}></div>
                    <div className="hero-list">
                        {teamHeroSlots}
                    </div>
                    <div className="hero-list-divider">
                        <img src={'./images/cross.png'} />
                    </div>
                    <div className="hero-list">
                        {enemyHeroSlots}
                    </div>
                </div>
            </div>
        );
    }

    handleHeroSelected(team, index, selectedHero) {
        const teamKey = (team === 'team') ? 'teamHeroSelections' : 'enemyHeroSelections';
        const newHeroSelection = this.state[teamKey].slice();
        newHeroSelection[index] = selectedHero;

        this.setState({
            [teamKey]: newHeroSelection,
        });

        localStorage.setItem(teamKey, JSON.stringify(newHeroSelection));
    }
}

export default App;
