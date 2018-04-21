import React, { Component } from 'react';
import './App.css';
import HeroSlot from './HeroSlot';
import ItemRecommendation from './ItemRecommendation';
import request from 'request';

class App extends Component {
    constructor() {
        super();
        this.state = {
            activeModelName: '',
            availableModels: [],
            displayItems: false,
            teamHeroSelections: [null, null, null, null, null],
            enemyHeroSelections: [null, null, null, null, null],
            teamItems: [],
            enemyItems: [],
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

        request({
            url: `${window.location.protocol}//${window.location.hostname}:5000/api/get_models`,
            method: 'GET',
            json: {},
         }, (err, res, body) => {
            if (body.status === 'ok') {
                this.setState({
                    activeModelName: body.data.active,
                    availableModels: body.data.models,
                });
            }
        });
    }

    render() {
        const { activeModelName, availableModels, displayItems, teamHeroSelections, enemyHeroSelections, teamItems, enemyItems } = this.state;
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

        const teamHeroItemList = [];
        const enemyHeroItemList = [];
        if (displayItems) {
            for (let i = 0; i < 5; i++) {
                teamHeroItemList.push(
                    <ItemRecommendation
                        key={`team-item-recommendation-${i}`}
                        hero={teamHeroSelections[i]}
                        items={teamItems[teamHeroSelections[i].id]} />
                );

                enemyHeroItemList.push(
                    <ItemRecommendation
                        key={`enemy-item-recommendation-${i}`}
                        hero={enemyHeroSelections[i]}
                        items={enemyItems[enemyHeroSelections[i].id]} />
                );
            }
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">D2Rec - Dota Item Recommendation System</h1>
                </header>
                <div className="model-selection-container">
                    <div className="model-selection-title">Model selection</div>
                    {availableModels.map((modelName, modelIdx) => (
                        <div
                            key={`model-selection-${modelIdx}`}
                            className={`model-selection-item ${activeModelName === modelName ? 'active' : ''}`}
                            onClick={() => this.handleModelSelection(modelName)}>
                            {modelName}
                        </div>
                    ))}
                </div>
                <div className="container">
                    <div className="container-background" style={{ backgroundImage: "url('./images/bg-small.jpg')" }}></div>
                    {displayItems ?
                        <div className="hero-item-display">
                            <div className="hero-item-list">
                                {teamHeroItemList}
                            </div>
                            <div className="request-item-button">
                                <img src={'./images/cross.png'} onClick={this.handleBackButtonClick.bind(this)} />
                            </div>
                            <div className="hero-item-list">
                                {enemyHeroItemList}
                            </div>
                        </div>
                        :
                        <div className="hero-display">
                            <div className="hero-list">
                                {teamHeroSlots}
                            </div>
                            <div className="request-item-button">
                                <img src={'./images/cross.png'} onClick={this.handleRequestItemButtonClick.bind(this)} />
                            </div>
                            <div className="hero-list">
                                {enemyHeroSlots}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }

    handleModelSelection(modelName) {
        request({
            url: `${window.location.protocol}//${window.location.hostname}:5000/api/change_model`,
            method: 'POST',
            json: { modelName },
         }, (err, res, body) => {
            if (body.status === 'ok') {
                this.setState({
                    activeModelName: modelName,
                });
            }
        });
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

    handleBackButtonClick() {
        this.setState({
            displayItems: false,
            teamItems: [],
            enemyItems: [],
        });
    }

    handleRequestItemButtonClick() {
        const teamHeroes = this.state.teamHeroSelections;
        const enemyHeroes = this.state.enemyHeroSelections;

        if (teamHeroes.some(h => !h) || enemyHeroes.some(h => !h)) {
            return;
        }

        request({
            url: `${window.location.protocol}//${window.location.hostname}:5000/api/compute_items`,
            method: 'POST',
            json: {
                heroes: {
                    team: teamHeroes,
                    enemy: enemyHeroes,
                },
            },
         }, (err, res, body) => {
            this.setState({
                displayItems: true,
                teamItems: body.data.team,
                enemyItems: body.data.enemy,
            });
        });
    }
}

export default App;
