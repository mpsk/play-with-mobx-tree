import * as React from "react";
import { observer } from "mobx-react";
import { IWish, IWishStore } from "../../models/WishStore";
import WishListItem from "./WishListItem";
import WishListItemCreate from "./WishListItemCreate";

import "./WishList.css";

export interface IWishListViewProps {
	wishStore: IWishStore;
}

const WishListView: React.SFC<IWishListViewProps> = ({wishStore}) => {

	const onDeleteItem = (item: IWish) => {
		wishStore.remove(item);
	};

	return (
		<div className="WishList">
			<ul>
				{wishStore.items.map((item: IWish, idx) => <WishListItem key={idx} item={item} onDelete={onDeleteItem}/>)}
			</ul>
			<div>
				Total Price: $ {wishStore.totalPrice}
			</div>
			<WishListItemCreate wishStore={wishStore} />
		</div>
	);
}

// export default WishListView;
export default observer(WishListView);