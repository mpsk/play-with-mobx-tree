import { types, flow } from "mobx-state-tree";
import { WishStore } from './WishStore';

export const User = types
	.model("User", {
		id: types.string,
		name: types.string,
		gender: types.enumeration(["male", "female"]),
		wishList: types.optional(WishStore, {})
	})
	.actions((instance) => ({
		getSuggestions: flow(function* () {
			const resp = yield fetch(`/suggestions_${instance.gender}`);
			const suggestions = yield resp.json();
			instance.wishList.items.push(...suggestions);
		})
	}))

export const Group = types
	.model("Group", {
		// users: types.map(User)
		users: types.optional(types.array(User), [])
	});
