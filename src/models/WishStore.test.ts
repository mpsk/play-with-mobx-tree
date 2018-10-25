import { reaction } from "mobx";
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { WishStore, Wish, data } from "./WishStore";

describe("WishList Tests: ", () => {
	it("can create an instance of WishListItem", () => {
		const item = Wish.create(data);
	
		expect(item.price).toBe(data.price);
		expect(item.name).toBe(data.name);

		item.setName("newName");
		expect(item.name).toBe("newName");
	});

	it("can create an instance of WishList", () => {
		const list = WishStore.create({
			items: [data]
		});

		expect(list.items.length).toBe(1);
	});

	it("add item to wishlist", () => {
		const item = Wish.create(data);
		const list = WishStore.create();
		const states = {
			item: [] as any,
			list: [] as any
		};

		const patches = {
			item: [] as any,
			list: [] as any
		};

		onSnapshot(item, (snap) => states.item.push(snap));
		onSnapshot(list, (snap) => states.list.push(snap));

		onPatch(item, (snap) => patches.item.push(snap));
		onPatch(list, (snap) => patches.list.push(snap));

		expect(list.items.length).toEqual(0);
		list.add(item);

		expect(list.items[0]).toEqual(data);

		item.setName("TEST_NAME");
		expect(list.items[0].name).toEqual("TEST_NAME");

		expect(getSnapshot(list)).toEqual({
			items: [item]
		});

		expect(getSnapshot(list)).toMatchSnapshot();
		expect(states).toMatchSnapshot();
		expect(patches).toMatchSnapshot();

	});

	it("total price for list", () => {
		const item1 = {...data};
		const item2 = {...data, name: "Item2", price: 100};
		const list = WishStore.create({
			items: [ item1, item2 ]
		});

		expect(list.totalPrice).toBe(item1.price + item2.price);

		let changedPrice = 0;
		reaction(() => list.totalPrice, () => changedPrice++);

		expect(changedPrice).toBe(0);
		console.log(list.totalPrice, changedPrice);

		list.items[0].setPrice(200);
		console.log(list.totalPrice, changedPrice);

		expect(changedPrice).toBe(1);
		expect(list.totalPrice).toBe(300);
	});
});