import "/node_modules/modern-normalize/modern-normalize.css";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

import { useState, useEffect } from "react";

const KEY = "contacts";

const App = () => {
	const getFromLocalStorage = (key) => {
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

	const saveToLocalStorage = (key, value) => {
		try {
			const contacts = JSON.stringify(value);
			localStorage.setItem(key, contacts);
		} catch (error) {
			console.log("Error state is: ", error.message);
		}
	};

	const [phonebook, setPhonebook] = useState(() => {
		return { contacts: getFromLocalStorage(KEY), filter: "" };
	});

	useEffect(() => {
		saveToLocalStorage(KEY, phonebook.contacts);
	}, [phonebook]);

	const addContact = ({ newContact }) => {
		if (phonebook.contacts.find((item) => item.name === newContact.name)) {
			alert(`${newContact.name} is already in contacts!`);
			return;
		}
		setPhonebook((prev) => ({
			contacts: [...prev.contacts, newContact],
			filter: prev.filter,
		}));
	};

	const handleFilter = (e) => {
		setPhonebook({ ...phonebook, filter: e.target.value });
	};

	const handleDelete = (id) => {
		setPhonebook((prev) => ({
			contacts: prev.contacts.filter((el) => el.id !== id),
			filter: prev.filter,
		}));
	};

	return (
		<div className="App">
			<h1 className="title">Phonebook</h1>
			<ContactForm addContact={addContact} />

			<h2 className="title">Contacts</h2>
			<Filter handleFilter={handleFilter} />
			<ContactList
				contacts={phonebook.contacts}
				seek={phonebook.filter}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default App;
