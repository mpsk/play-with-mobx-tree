import * as React from "react";
import { Wish, IWish, IWishStore } from "../../models/WishStore";
import WishListItemEdit from "./WishListItemEdit";

export interface IWishListItemCreateProps {
	wishStore: IWishStore;
}

export interface IWishListItemCreateState {
	data: IWish;
}

class WishListItemCreate extends React.Component<IWishListItemCreateProps, IWishListItemCreateState> {

	state = {
		data: Wish.create({name: "", price: 0})
	}

	onAdd = () => {
		if (this.state.data.name) {
			this.props.wishStore.add(this.state.data);
			this.setState({
				data: Wish.create({name: "", price: 0})
			});
		}
	}

	render() {
		return (
			<div className="WishListItemCreate">
				<WishListItemEdit item={this.state.data} />
				<button onClick={this.onAdd}>Add</button>
			</div>
		)
	}
}

export default WishListItemCreate;
// export default observer(WishListItemCreate);