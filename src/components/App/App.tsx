import * as React from 'react';
import './App.css';

import WishList from "../WishList/WishList";
import { User, Group } from "../../models/Group";

export interface IAppProps {
	// wishStore: any;
	group: typeof Group.Type;
}

class App extends React.Component<IAppProps, {selectedUser: typeof User.Type | undefined}> {

	state = {
		selectedUser: this.props.group.users[0]
	};

	onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const id = event.target.value;
		this.setState({
			selectedUser: this.props.group.users.find(user => user.id === id)
		});
	}

	render() {
		const { group } = this.props;
		const { selectedUser } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">WishList</h1>
				</header>
				<div>
					Users:
					<select onChange={this.onSelectUser}>
						<option value="">--- No selection ---</option>
						{group.users.map((user) => {
							return (
								<option value={user.id} key={user.id} selected={selectedUser && user.id === selectedUser.id}>
									{user.name}
								</option>
							);
						})}
					</select>
				</div>
				{selectedUser ? <WishList wishStore={(selectedUser as any).wishList} /> : null}
			</div>
		);
	}
}

export default App;
