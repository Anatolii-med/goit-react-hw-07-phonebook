import React from 'react';
import { FormWrap, Labels } from './contactForm.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAddContactDataMutation } from 'redux/Contacts/ContactsSlice';

function ContactForm({ filterContact }) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [addContactData] = useAddContactDataMutation();

	function handleDataInput(e) {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'phone':
				setPhone(value);
				break;
			default:
				break;
		}
	}

	function addContact(e) {
		e.preventDefault();

		filterContact?.find(
			contact => contact.name.toLowerCase() === name.toLowerCase()
		)
			? toast.error(`${name} is already in contacts`)
			: addContactData({ name, phone });

		setName('');
		setPhone('');
	}

	return (
		<>
			<FormWrap onSubmit={addContact}>
				<Labels htmlFor="name">
					Name:
					<input
						autoComplete="off"
						type="text"
						value={name}
						onChange={handleDataInput}
						name="name"
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
					/>
				</Labels>
				<Labels htmlFor="number">
					Phone number:
					<input
						autoComplete="off"
						type="tel"
						value={phone}
						onChange={handleDataInput}
						name="phone"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
					/>
				</Labels>
				<button type="submit">Add contact</button>
			</FormWrap>
		</>
	);
}

export default ContactForm;

ContactForm.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
};
