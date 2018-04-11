import React from 'react';
import { displayName, getHeroThumbnail, getItemThumbnail, getItemById } from './Utils';

export default class ItemRecommendation extends React.Component {
    render() {
        const { hero, itemIds } = this.props;

        const recommendedItemViews = [];

        for (const itemIdx in itemIds) {
            const id = itemIds[itemIdx];
            const item = getItemById(id);

            if (item) {
                recommendedItemViews.push(
                    <div
                        className="item-recommendation-item"
                        key={`hero-item-${itemIdx}`}
                        style={{backgroundImage: `url(${getItemThumbnail(item.name)})`}}>
                        {/* <div className="item-recommendation-name">{displayName(item.name)}</div> */}
                    </div>
                );
            }
        }

        return (
            <div className="item-recommendation">
                <div className="item-recommendation-hero-name">{displayName(hero.name)}</div>
                <div className="item-recommendation-list">
                    {recommendedItemViews}
                </div>
            </div>
        )
    }
}