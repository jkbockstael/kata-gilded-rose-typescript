interface ItemUpdateStrategy {
  updateItem(item: Item): Item;
}

class RegularItemStrategy implements ItemUpdateStrategy {
  updateItem(item: Item): Item {
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
}

class AgingItemUpdateStrategy implements ItemUpdateStrategy {
  updateItem(item: Item): Item {
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
}

class LegendaryItemUpdateStrategy implements ItemUpdateStrategy {
  updateItem(item: Item): Item {
    // no-op
    return item;
  }
}

class PassItemUpdateStrategy implements ItemUpdateStrategy {
  updateItem(item: Item): Item {
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
}

class ConjuredItemUpdateStrategy implements ItemUpdateStrategy {
  updateItem(item: Item): Item {
    item.sellIn -= 1;
    item.quality -=
      (item.sellIn >= 0)
      ? 2
      : 4;
    if (item.quality < 0) {
      item.quality = 0;
    }
    return item;
  }
}

enum ItemType {
  AGING,
  LEGENDARY,
  PASS,
  CONJURED,
  REGULAR
}

class ItemUpdater {
  strategies: Map<ItemType, ItemUpdateStrategy>;

  constructor() {
    this.strategies = new Map<ItemType, ItemUpdateStrategy>();
    this.strategies.set(ItemType.AGING, new AgingItemUpdateStrategy());
    this.strategies.set(ItemType.LEGENDARY, new LegendaryItemUpdateStrategy());
    this.strategies.set(ItemType.PASS, new PassItemUpdateStrategy());
    this.strategies.set(ItemType.CONJURED, new ConjuredItemUpdateStrategy());
    this.strategies.set(ItemType.REGULAR, new RegularItemStrategy());
  };

  private itemType(item: Item): ItemType {
    if (item.name.startsWith("Conjured")) {
      return ItemType.CONJURED;
    }
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

  updateItem(item: Item): Item {
    // "as ItemUpdateStrategy" because the map is in fact exhaustive
    return (this.strategies.get(this.itemType(item)) as ItemUpdateStrategy).updateItem(item);
  }
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
  updater: ItemUpdater;

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.updater = new ItemUpdater();
  }

  updateQuality() {
    this.items.forEach(item => this.updater.updateItem(item))
    return this.items;
  }
}
