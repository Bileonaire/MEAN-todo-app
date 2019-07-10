'use strict';

var express = require('express');
var Todo = require('../models/todo');
var router = express.Router();

router.get('/todos', function(req, res) {
	Todo.find({}, function(err, todos) {
		if (err) {
			return res.status(500).json({ message: err.message });
		}
		res.json({ todo: todos });
	});
});

// TODO : App post to create new
router.post('/todos', function(req, res) {
	const { name } = req.body;
	Todo.find({ name }, async function(err, todos) {
		if (!err && !todos.length) {
			const todo = await Todo.create({ completed: false, name });
			return res.status(201).json({
				message: 'Todo has been created',
				todo,
			});
		}
		return res.status(500).json({
			message: 'Error occured, chack if the todo already exists',
		});
	});
});

// TODO : App put to update new
router.put('/todos/:id', async function(req, res) {
	const { id } = req.params;
	try {
		const todo = await Todo.findOneAndUpdate(id, req.body, { new: true });
		return res.json({ message: 'Todo Updated', todo });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
});

// TODO : App delete to delete
router.delete('/todos/:id', async function(req, res) {
	const { id } = req.params;
	await Todo.findOneAndDelete(id, function(err, todo) {
		if (err) {
			return res.status(500).json({ err: err.message });
		}
		console.log(todo);
		return res.json({ message: 'Todo deleted' });
	});
});

module.exports = router;
