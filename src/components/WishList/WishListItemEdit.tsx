import * as React from "react";
import { observer } from "mobx-react";
import { IWish } from "../../models/WishStore";

export interface IWishListItemEditProps {
	item: IWish;
}

class WishListItemEdit extends React.Component<IWishListItemEditProps> {

	onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.item.setImage(event.target.value);
	}

	onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.item.setName(event.target.value);
	}

	onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		const price = parseFloat(event.target.value);
		if (!isNaN(price) && this.props.item.price !== price) {
			this.props.item.setPrice(price);	
		}
	}

	render() {
		const { item } = this.props;

		return (
			<div className="WishListItemEdit">
				<span>Name: </span>
				<input type="text" value={item.name} onChange={this.onChangeName} />
				<br/>
				<span>Price: </span>
				<input type="text" value={item.price} onChange={this.onChangePrice} />
				<br/>
				<span>Image: </span>
				<input type="text" value={item.image} onChange={this.onChangeImage} />
				<br/>
			</div>
		)
	}
}

export default observer(WishListItemEdit);