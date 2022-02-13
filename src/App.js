import "/node_modules/modern-normalize/modern-normalize.css";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

import { Component } from "react";

const KEY = "contacts";

class App extends Component {
	getFromLocalStorage = (key) => {
		try {
			const rawData = localStorage.getItem(key);
			const contacts = JSON.parse(rawData);

			if (rawData === null || !Array.isArray(contacts)) {
				return [];
			}

			return contacts.filter(({ id, name, number }) => id && name && number);
		} catch (error) {
			console.log("Error state is: ", error.message);
		}
	};

	saveToLocalStorage = (key, value) => {
		try {
			const contacts = JSON.stringify(value);
			localStorage.setItem(key, contacts);
		} catch (error) {
			console.log("Error state is: ", error.message);
		}
	};

	constructor(props) {
		super(props);
		this.state = { contacts: this.getFromLocalStorage(KEY), filter: "" };
	}

	componentDidUpdate() {
		this.saveToLocalStorage(KEY, this.state.contacts);
	}

	addContact = ({ newContact }) => {
		if (this.state.contacts.find((item) => item.name === newContact.name)) {
			alert(`${newContact.name} is already in contacts!`);
			return;
		}
		this.setState((prev) => ({ contacts: [...prev.contacts, newContact] }));
	};

	handleFilter = (e) => {
		this.setState({ filter: e.target.value });
	};

	handleDelete = (id) => {
		this.setState((prev) => ({
			contacts: prev.contacts.filter((el) => el.id !== id),
		}));
	};

	render() {
		return (
			<div className="App">
				<h1 className="title">Phonebook</h1>
				<ContactForm addContact={this.addContact} />

				<h2 className="title">Contacts</h2>
				<Filter handleFilter={this.handleFilter} />
				<ContactList
					contacts={this.state.contacts}
					seek={this.state.filter}
					handleDelete={this.handleDelete}
				/>
			</div>
		);
	}
}

export default App;
