const express = require('express');
const router = express.Router();

// @route   GET    api/contacts
// @desc    Get all user's contacts.
// @access  Private
router.get('/', (req, res) => {
  res.send('Get contacts from user.');
});

// @route   POST    api/contacts
// @desc    Add new Contacts
// @access  Private
router.post('/', (req, res) => {
  res.send('Add new contact to user.');
});

// @route   PUT    api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update Contact');
});

// @route   DELETE    api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete Contact');
});

module.exports = router;
