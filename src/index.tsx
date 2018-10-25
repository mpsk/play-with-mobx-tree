import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { onSnapshot } from "mobx-state-tree";
import Timeout from "timeout-exec";
import App from './components/App/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { WishStore, data } from "./models/WishStore";
import { Group, User } from "./models/Group";

type AppStore = {
	wishStore: typeof WishStore.Type;
	group: typeof Group.Type;
};

const { store } = bootstrapStore();

renderApp(store);
onStart(store);
registerServiceWorker();

if ((module as any).hot) {
	(module as any).hot.accept(['./components/App/App'], () => renderApp(store));
}

function renderApp(store: AppStore) {
	ReactDOM.render(<App group={store.group} />, document.getElementById('root') as HTMLElement);
}

function onStart(store: AppStore) { // just for emulate
	const timeout = new Timeout();
	timeout
		.interval(1000)
		.execute(() => {
			// const price = store.wishStore.items[0].price;
			// store.wishStore.items[0].setPrice(price + 1);
		});

	setTimeout(() => timeout.destroy(), 1000 * 100);
}

function bootstrapStore(): {store: AppStore; disposers: Record<string, Function>} {
	const APP_KEY = "themobxtreeapp";
	const initialState = {
		wishStore: {
			items: [data]
		},
		group: {
			users: [{
				id: "user1",
				name: "User First",
				gender: "male",
				wishList: {
					items: [data]
				}
			}, {
				id: "user2",
				name: "Second User",
				gender: "female"
			}] as Array<typeof User.Type>
		}
	};
	if (localStorage.getItem(APP_KEY)) {
		Object.assign(initialState, JSON.parse(localStorage.getItem(APP_KEY) as string));
	}
	
	const store: AppStore = {
		wishStore: WishStore.is(initialState.wishStore) ? WishStore.create(initialState.wishStore) : initialState.wishStore,
		group: Group.is(initialState.group) ? Group.create(initialState.group) : initialState.group
	};

	const saveStore = (key: keyof typeof store, spanshot: object) => {
		let localState = localStorage.getItem(APP_KEY) ?
			JSON.parse(localStorage.getItem(APP_KEY) as string) : 
			{};
		localState[key] = spanshot;
		localStorage.setItem(APP_KEY, JSON.stringify(localState));
	};
	const disposers = Object.keys(store)
		.reduce((res, key: keyof typeof store) => {
			res[key] = onSnapshot(store[key] as any, (spanshot: object) => saveStore(key, spanshot));
			return res;
		}, {});

	Object.assign(window, { store, disposers });

	return { store, disposers };
}
