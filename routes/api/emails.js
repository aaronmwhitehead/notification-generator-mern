const express = require('express');
const router = express.Router();

// // Load Email model
const Email = require('../../models/Schema');

// @route GET api/emails/test
// @description tests emails route
// @access Public
router.get('/test', (req, res) => res.send('email route testing!'));

// @route GET /:id
// @description Get single email by id
// @access Public
router.get('/:id', (req, res) => {
  Email.findById(req.params.id)
    .then(email => res.json(email))
    .catch(err => res.status(404).json({ noemailfound: 'No Email found' }));
});

// @route POST /:id
// @description add/save email
// @access Public
router.post('/:id', (req, res) => {
  console.log(req.body.id);
  Email.findByIdAndUpdate(req.body.id, {content: JSON.stringify(req.body.content), updated_date: Date.now()}, { new: true, upsert: true })
    .then((res) => {
      console.log(res)
    })
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

module.exports = router;