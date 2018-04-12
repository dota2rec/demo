import { HEROES, ITEMS, ITEM_DESC } from './Constants';

const itemIdLookup = {};
for (const item of ITEMS) {
    itemIdLookup[item.id] = item;
}

export function displayName(name) {
    return name.split('_').map(segment => segment.charAt(0).toUpperCase() + segment.substr(1)).join(' ');
}

export function getHeroThumbnail(heroName) {
    return `./images/heroes/${heroName}.png`;
}

export function getItemThumbnail(itemName) {
    return `./images/items/${itemName}.png`;
}

export function getItemById(itemId) {
    return itemIdLookup[itemId];
}

export function getItemDetailByName(itemName) {
    return ITEM_DESC[itemName];
}