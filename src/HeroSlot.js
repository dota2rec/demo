import React from 'react';
import { HEROES, ITEMS } from './Constants';
import { displayName, getHeroThumbnail } from './Utils';

export default class HeroSlot extends React.Component {
    constructor() {
        super();

        this.state = {
            showSelector: false,
            filterText: '',
        }
    }

    render() {
        const { showSelector, filterText } = this.state;
        const { selectedHero } = this.props;

        const filteredHeroList = this.getFilteredHeroList(filterText);

        return (
            <div className="hero-slot">
                <div className="hero-slot-item" onClick={this.handleHeroSlotItemClick.bind(this)}>
                    {selectedHero ?
                        <div className="hero-item" style={{ backgroundImage: `url(${getHeroThumbnail(selectedHero.name)})` }}>
                            {displayName(selectedHero.name)}
                        </div>
                        :
                        <div className="hero-slot-empty">
                            +
                        </div>
                    }
                </div>
                {showSelector ?
                    <div>
                    <div className="hero-selector-overlay" onClick={this.handleHeroSelectorOverlayClick.bind(this)}></div>
                        <div className="hero-selector">
                            <input
                                ref="heroSelectorInput"
                                type="text"
                                className="hero-selector-input"
                                placeholder="Search for heroes"
                                onChange={this.handleHeroSelectorInputChange.bind(this)} />
                            <div className="hero-selector-list">
                                {filteredHeroList.length > 0 ?
                                    filteredHeroList.map(hero => (
                                        <div
                                            key={hero.id}
                                            className="hero-selector-item"
                                            onClick={() => this.handleHeroSelectorItemClick(hero)}>
                                            <img className="hero-selector-thumbnail" src={getHeroThumbnail(hero.name)} />
                                            <div className="hero-selector-name">{displayName(hero.name)}</div>
                                        </div>
                                    )):
                                    <div className="hero-selector-not-found">No matching hero</div>
                                }
                            </div>
                        </div>
                    </div>
                : null }
            </div>
        )
    }

    getFilteredHeroList(filterText) {
        return filterText ? HEROES.filter(h => h.name.indexOf(filterText) !== -1) : HEROES;
    }

    handleHeroSlotItemClick() {
        this.setState({
            showSelector: true,
        });
    }

    handleHeroSelectorInputChange(evt) {
        this.setState({
            filterText: evt.target.value,
        });
    }

    handleHeroSelectorItemClick(hero) {
        const { team, index, onHeroSelected } = this.props;

        this.setState({
            showSelector: false,
        });

        onHeroSelected(team, index, hero);
    }

    handleHeroSelectorOverlayClick() {
        this.setState({
            showSelector: false,
        });
    }
}