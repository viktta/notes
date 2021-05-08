const express = require('express');
const NotesModel = require('../models/NotesModel');
const router = express.Router();
const Bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
const mongoose = require('mongoose');
// Find all Notes
router.get('/', async (req, res) => {
	try {
		const notes = await NotesModel.find();
		res.json(notes)
	} catch (err) {
		res.json({ message: err });
	}
});

router.post('/notes', async (req, res) => {
	try {
		const Notes = new NotesModel({
			name: req.body.name,
			note: req.body.note,
			user: req.body.user
		});

		const savedNotes = await Notes.save();
		res.send(savedNotes);
	} catch (err) {
		res.json({ message: err });
	}
});


router.get('/notes/:user', async (req, res) => {
	try {
		const Notes = await NotesModel.find(req.params)
		res.json(Notes);
	} catch (err) {
		res.json({ message: err })
	}
})


router.patch('/notes/:id/', async (req, res) => {
	try {
		const updateObject = req.body;
		const id = req.params.id;
		const Notes = await NotesModel.findByIdAndUpdate(id, updateObject);
		res.send(Notes);
	} catch (err) {
		res.send({ message: err })
	}
})

//test
// router.get('/notes/:id', async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const Notes = await NotesMotes.find({ _id: mongoose.Types.ObjectId(id) })
// 		res.send(Notes)
// 	} catch (err) {
// 		res.send({ message: err })
// 	}
// })

router.get('/notes/:user/:name', async (req, res) => {
	try {
		const Notes = await NotesModel.find(req.params)
		res.json(Notes);
	} catch (err) {
		res.json({ message: err })
	}
})


router.post('/register', async (req, res) => {
	try {
		req.body.password = Bcrypt.hashSync(req.body.password, 10);
		const user = new UserModel({
			username: req.body.username,
			password: req.body.password
		});
		const result = await user.save();
		res.send(result);
	} catch (err) {
		res.status(500).send(err);
	}
})


router.post('/login', async (req, res) => {
	try {
		const user = await UserModel.findOne({ username: req.body.username });
		if (!user) {
			return res.status(400).send({ message: "The username does not exist" });
		}
		if (!Bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(400).send({ message: "The password is invalid" });
		}

		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}

})

router.get('/dump', async (req, res) => {
	try {
		const result = await UserModel.find();
		res.send(result);
	} catch (err) {
		res.status(500).send(err);
	}
})

module.exports = router;
