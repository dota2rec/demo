import React from 'react';
import ItemView from './ItemView';
// import ReactTooltip from 'react-tooltip';
import { displayName, getHeroThumbnail, getItemById, getItemDetailByName } from './Utils';

export default class ItemRecommendation extends React.Component {
    render() {
        const { hero, itemIds } = this.props;

        const recommendedItemViews = [];

        for (const itemIdx in itemIds) {
            const idPair = itemIds[itemIdx];
            const item = getItemById(idPair.id);

            if (!item) {
                console.log('item not found', idPair.id);
                continue;
            }

            item.detail = getItemDetailByName(item.name);

            if (item) {
                recommendedItemViews.push(
                    <ItemView
                        key={`hero-item-${itemIdx}`}
                        item={item}
                        itemNewId={idPair.new_id} />
                );
            }
        }

        return (
            <div className="item-recommendation">
                <div
                    className="item-recommendation-hero-image"
                    style={{ backgroundImage: `url(${getHeroThumbnail(hero.name)})` }}></div>
                <div>
                    <div className="item-recommendation-hero-name">{displayName(hero.name)}</div>
                    <div className="item-recommendation-list">
                        {recommendedItemViews}
                    </div>
                </div>
            </div>
        )
    }
}