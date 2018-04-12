import React from 'react';
import { getItemThumbnail, displayName } from './Utils';

export default class ItemView extends React.Component {
    constructor() {
        super();
        this.state = {
            showTooltip: false,
        };
    }

    render() {
        const { item } = this.props;
        const { showTooltip } = this.state;

        return (
            <div
                className="item-recommendation-item"
                style={{ backgroundImage: `url(${getItemThumbnail(item.name)})` }}
                onMouseOver={this.handleMouseOver.bind(this)}
                onMouseLeave={this.handleMouseOut.bind(this)}>
                {showTooltip ? (
                    <div className="item-tooltip">
                        <div className="item-tooltip-info item-tooltip-name">{displayName(item.name)}</div>
                        {item.detail.cost ? <div className="item-tooltip-info item-tooltip-cost"><img src="./images/gold.png" />{item.detail.cost}</div> : null}
                        <div className="item-tooltip-info item-tooltip-desc" dangerouslySetInnerHTML={{ __html: item.detail.desc }} />
                        <div className="item-tooltip-info item-tooltip-notes" dangerouslySetInnerHTML={{ __html: item.detail.notes }} />
                        <div className="item-tooltip-info item-tooltip-attrib" dangerouslySetInnerHTML={{ __html: item.detail.attrib }} />
                        {(item.detail.cd || item.detail.mc) ?
                            <div className="item-tooltip-info item-tooltip-cd-mc">
                                {item.detail.cd ? <span className="cd-mc"><img src="./images/cooldown.png" />{item.detail.cd}</span> : null}
                                {item.detail.mc ? <span className="cd-mc"><img src="./images/mana.png" />{item.detail.mc}</span> : null}
                            </div>
                        : null}
                        <div className="item-tooltip-info item-tooltip-lore" dangerouslySetInnerHTML={{ __html: item.detail.lore }} />
                    </div>
                ) : null}
            </div>
        )
    }

    handleMouseOver() {
        this.setState({
            showTooltip: true,
        });
    }

    handleMouseOut() {
        this.setState({
            showTooltip: false,
        });
    }
}