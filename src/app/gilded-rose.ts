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

  updateItemQuality(item: Item): Item {

    if (item.name === 'Aged Brie') {
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

    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      // no-op
      return item;
    }

    if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
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

  updateQuality() {
    this.items = this.items.map(this.updateItemQuality);
    return this.items;
  }
}
