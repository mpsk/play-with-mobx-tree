import { types, getParent, destroy } from "mobx-state-tree";

export const data = {
	name: "Chronicles",
	price: 26.34,
	image: "https://github.com/mobxjs/mobx-state-tree/raw/master/docs/mobx-state-tree-logo-gradient.svg?sanitize=true"
};

export const Wish = types
	.model("Wish", {
		name: types.string,
		price: types.number,
		image: types.optional(types.string, data.image)
	})
	.actions((self) => ({
		setName: (name: string) => {
			self.name = name;
		},
		setPrice: (price: number) => {
			self.price = Number(price.toFixed(2));
		},
		setImage: (src: string) => {
			self.image = src;
		},
		remove: () => {
			(getParent(self, 2) as IWishStore).remove(self as IWish);
		}
	}));

export type IWish = typeof Wish.Type;

export const WishStore = types
	.model("WishStore", {
		items: types.optional(types.array(Wish), [])
	})
	.views((instance) => ({
		get totalPrice() {
			return instance.items.reduce((res, item) => res += item.price, 0)
		}
	}))
	.actions((instance) => ({
		add: (item: IWish) => {
			instance.items.push(item);
		},
		remove: (item: IWish) => {
			// instance.items.splice(instance.items.indexOf(item), 1);
			destroy(item);
		}
	}));

export type IWishStore = typeof WishStore.Type;