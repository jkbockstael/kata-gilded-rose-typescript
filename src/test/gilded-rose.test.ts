import { describe, test, expect } from "vitest";
import { Item, GildedRose } from "../app/gilded-rose";
import thirty_days from "./30-days.json" with { type: "json" };

describe("Documented requirements", () => {
    test("The updateQuality returns an array of Items", () => {
        const gr_initial = new GildedRose();
        const gr_updated = gr_initial.updateQuality();
        expect(Array.isArray(gr_updated)).toBe(true);
    });
    test("Updating does not add or remove items from the inventory", () => {
        const gr_initial = new GildedRose([
            new Item("AgedBrie", 10, 30),
            new Item("Cape of the Owl", 50, 1),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated).toHaveLength(2);
    });
    test("Each day lowers both the SellIn and the Quality values", () => {
        const gr_initial = new GildedRose([
            new Item("Cape of the Owl", 50, 1),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(49);
        expect(gr_updated[0].quality).toBe(0);
    });
    test("Items past their due date degrade twice as fast", () => {
        const gr_initial = new GildedRose([
            new Item("Highland Spring Water", 10, 10),
            new Item("Highland Spring Water", 0, 10),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(9);
        expect(gr_updated[0].quality).toBe(9);
        expect(gr_updated[1].sellIn).toBe(-1);
        expect(gr_updated[1].quality).toBe(8);
    });
    test("The quality of an item is never negative", () => {
        const gr_initial = new GildedRose([
            new Item("Cape of the Owl", 50, 0),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(49);
        expect(gr_updated[0].quality).toBe(0);
    });
    test("Aged Brie increases in quality over time", () => {
        const gr_initial = new GildedRose([
            new Item("Aged Brie", 10, 20),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(9);
        expect(gr_updated[0].quality).toBe(21);
    });
    test("Aged Brie increases in quality faster when past due date", () => {
        const gr_initial = new GildedRose([
            new Item("Aged Brie", 0, 20),
            new Item("Aged Brie", -1, 50),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(-1);
        expect(gr_updated[0].quality).toBe(22);
        expect(gr_updated[1].sellIn).toBe(-2);
        expect(gr_updated[1].quality).toBe(50);
    });
    test("The quality of an item is never above 50", () => {
        const gr_initial = new GildedRose([
            new Item("Aged Brie", 10, 50),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(9);
        expect(gr_updated[0].quality).toBe(50);
    });
    test("Sulfuras never has to be sold and doesn't decrease in quality", () => {
        const gr_initial = new GildedRose([
            new Item("Sulfuras, Hand of Ragnaros", 10, 80),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(10);
        expect(gr_updated[0].quality).toBe(80);
    });
    test("legendary items don't decrease in quality", () => {
        const gr_initial = new GildedRose([
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Sulfuras, Hand of Ragnaros", -1, -1),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].quality).toBe(80);
        expect(gr_updated[1].quality).toBe(-1);
    });
    test("Backstage passes increase quality normally up to 11 days before the due date", () => {
        const gr_initial = new GildedRose([
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(14);
        expect(gr_updated[0].quality).toBe(21);
    });
    test("Backstage passes increase quality by 2 starting ten days before the due date", () => {
        const gr_initial = new GildedRose([
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(9);
        expect(gr_updated[0].quality).toBe(22);
    });
    test("Backstage passes increase quality by 3 starting five days before the due date", () => {
        const gr_initial = new GildedRose([
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(4);
        expect(gr_updated[0].quality).toBe(23);
    });
    test("Backstage passes will not go higher than 50 in quality", () => {
        const gr_initial = new GildedRose([
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(9);
        expect(gr_updated[0].quality).toBe(50);
        expect(gr_updated[1].sellIn).toBe(4);
        expect(gr_updated[1].quality).toBe(50);
    });
    test("Backstage passes are worthless after the due date", () => {
        const gr_initial = new GildedRose([
            new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
        ]);
        const gr_updated = gr_initial.updateQuality();
        expect(gr_updated[0].sellIn).toBe(-1);
        expect(gr_updated[0].quality).toBe(0);
    });
});

type dayItem = {
    name: string,
    sellin: number,
    quality: number
}
const dayToInventory = (day: Array<dayItem>) => day.map(
    item => new Item(item.name, item.sellin, item.quality));

const inventoriesEqual = (day: Array<dayItem>, output: Array<Item>) =>
    day.length === output.length
    && day
        .map((item, index) =>
            item.name === output[index].name
            && item.sellin === output[index].sellIn
            && item.quality === output[index].quality)
        .reduce((a: boolean, b: boolean) => a && b, true);

describe("30 Days validation test", () => {
    test("30 days validation test", () => {
        let gr_current = new GildedRose(dayToInventory(thirty_days[0]));
        let gr_updated;
        for (let day_inventory of thirty_days.slice(1)) {
            gr_updated = gr_current.updateQuality();
            expect(inventoriesEqual(day_inventory, gr_updated)).toBe(true);
            gr_current = new GildedRose(dayToInventory(day_inventory));
        }
    });
});
