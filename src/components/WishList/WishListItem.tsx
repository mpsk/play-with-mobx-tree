import * as React from "react";
import { observer } from "mobx-react";
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";
import { IWish } from "../../models/WishStore";
import WishListItemEdit from "./WishListItemEdit";

export interface IWishListItemViewProps {
	item: IWish;
	onDelete(item: IWish): void;
}
export interface IWishListItemViewState {
	editable: boolean;
	clone: IWish;
}

class WishListItemView extends React.Component<IWishListItemViewProps, IWishListItemViewState> {
	
	state = {
		editable: false,
		clone: clone(this.props.item)
	};

	onEditToggle = () => {
		this.setState({
			editable: !this.state.editable,
			clone: clone(this.props.item)
		});
	}

	onCancelEdit = () => {
		this.setState({
			editable: false
		});
	}

	onSaveEdit = () => {
		applySnapshot(this.props.item, getSnapshot(this.state.clone));
		this.setState({
			editable: false
		});
	}

	onDelete = () => {
		this.props.onDelete(this.props.item);
	}

	render() {
		const { item } = this.props;
		if (this.state.editable) {
			return (
				<li className="WishListItem">
					<WishListItemEdit item={this.state.clone} />
					<div className="WishListItem-edit-btn">
						<button onClick={this.onSaveEdit}>Save</button>
						<button onClick={this.onCancelEdit}>Cancel</button>
					</div>
				</li>
			);
		}
		return (
			<li className="WishListItem">
				<div className="WishListItem-image">
					{item.image ? <img src={item.image} /> : null }
				</div>
				<div className="WishListItem-name">{item.name}</div>
				<div className="WishListItem-price">$ {item.price}</div>
				<div className="WishListItem-edit-btn">
					<button onClick={this.onEditToggle}>Edit</button>
					<button onClick={this.onDelete}>Delete</button>
				</div>
			</li>
		);
	}

}

export default observer(WishListItemView);