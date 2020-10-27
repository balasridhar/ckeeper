import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import axios from 'axios';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../Types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add Contact
  const addContact = async (contact) => {
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Add Contact
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts', config);
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`, config);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update a Contact
  const updateContact = async (contact) => {
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      console.error(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        getContacts,
        clearContacts,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
