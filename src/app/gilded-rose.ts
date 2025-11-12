enum ItemType {
  AGING,
  LEGENDARY,
  PASS,
  REGULAR
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateAgingItem(item: Item): Item {
    item.sellIn -= 1;
    item.quality +=
      (item.sellIn < 0)
      ? 2
      : 1;
    if (item.quality > 50) {
      item.quality = 50;
    }
    return item;
  }

  updateLegendaryItem(item: Item): Item {
    // no-op
    return item;
  }

  updateBackstagePassItem(item: Item): Item {
    item.sellIn -= 1;
    item.quality += 1;
    if (item.sellIn < 10) {
      item.quality += 1;
    }
    if (item.sellIn < 5) {
      item.quality += 1;
    }
    if (item.sellIn < 0) {
      item.quality = 0;
    }
    if (item.quality > 50) {
      item.quality = 50;
    }
    return item;
  }

  updateRegularItem(item: Item): Item {
    item.sellIn -= 1;
    item.quality -=
      (item.sellIn >= 0)
      ? 1
      : 2;
    if (item.quality < 0) {
      item.quality = 0;
    }
    return item;
  }

  itemType(item: Item): ItemType {
    switch (item.name) {
      case "Aged Brie":
        return ItemType.AGING;
      case "Sulfuras, Hand of Ragnaros":
        return ItemType.LEGENDARY;
      case "Backstage passes to a TAFKAL80ETC concert":
        return ItemType.PASS;
      default:
        return ItemType.REGULAR;
    }
  }

  updateItemQuality(item: Item): Item {
    switch (this.itemType(item)) {
      case ItemType.AGING:
        return this.updateAgingItem(item);
      case ItemType.LEGENDARY:
        return this.updateLegendaryItem(item);
      case ItemType.PASS:
        return this.updateBackstagePassItem(item);
      case ItemType.REGULAR:
        return this.updateRegularItem(item);
    }
  }

  updateQuality() {
    this.items = this.items.map(this.updateItemQuality, this);
    return this.items;
  }
}
