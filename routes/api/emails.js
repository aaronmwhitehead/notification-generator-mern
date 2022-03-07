const express = require('express');
const router = express.Router();

// Load Email model
const Email = require('../../models/Email');

// @route GET api/emails/test
// @description tests emails route
// @access Public
router.get('/test', (req, res) => res.send('email route testing!'));

// @route GET api/emails
// @description Get all emails
// @access Public
router.get('/', (req, res) => {
  Email.find()
    .then(emails => res.json(emails))
    .catch(err => res.status(404).json({ noemailsfound: 'No Emails found' }));
});

// @route GET api/emails/:id
// @description Get single email by id
// @access Public
router.get('/:id', (req, res) => {
  Email.findById(req.params.id)
    .then(email => res.json(email))
    .catch(err => res.status(404).json({ noemailfound: 'No Email found' }));
});

// @route GET api/emails
// @description add/save email
// @access Public
router.post('/', (req, res) => {
  Email.create(req.body)
    .then(email => res.json({ msg: 'Email added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this email' }));
});

// @route GET api/emails/:id
// @description Update email
// @access Public
router.put('/:id', (req, res) => {
  Email.findByIdAndUpdate(req.params.id, req.body)
    .then(email => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/emails/:id
// @description Delete email by id
// @access Public
router.delete('/:id', (req, res) => {
  Email.findByIdAndRemove(req.params.id, req.body)
    .then(email => res.json({ mgs: 'Email entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a email' }));
});

module.exports = router;
