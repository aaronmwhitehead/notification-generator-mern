const express = require('express');
const router = express.Router();

// // Load Email model
const Email = require('../../models/Schema');

// // @route GET /:id
// // @description Get single email by id
// // @access Public
router.get('/:id', (req, res) => {
  Email.findById(req.params.id)
    .then((template) => {
      res.json(template)
    })
    .catch(err => res.status(404).json({ noemailfound: 'No Email found', error: err }));
});

// @route POST /:id
// @description add/save email
// @access Public
router.post('/:id', (req, res) => {
  Email.findByIdAndUpdate(req.body.id, {content: JSON.stringify(req.body.content), title: req.body.title, updated_date: Date.now()}, { new: true, upsert: true })
    .then((template) => {
      res.json(template)
    })
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

module.exports = router;