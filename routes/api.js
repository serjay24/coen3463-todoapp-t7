var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Task =require('../models/taskLists');

/* GET home page. */
router.get('/user', function(req, res) {
	res.json(req.user);
});

router.get('/task/:filterState', function(req, res) {
/*
	Task.find(function(err, tasks){
		if(err) {
			res.send(err);
		}
		res.json(tasks);
	})
*/
	var filterState = req.params.filterState;
	console.log(filterState)

	if(req.user === undefined) {
		res.redirect('/')
	}
	/*
	else {
		var userId = req.user._id;

		console.log(userId)

		User.findById(userId).populate('tasks').exec(function(err, tasks) {
			if (err) {
				console.log(err)
				return;
			}

			console.log("Success");
			res.json(tasks.tasks);
		})
	}
	*/
	if(filterState === 'all') {
		var userId = req.user._id;
		console.log(userId)
		User.findById(userId).populate('tasks').exec(function(err, tasks) {
			if (err) {
				console.log(err)
				return;
			}
			console.log("Success");
			res.json(tasks.tasks);
		})
	}

	if(filterState === 'open') {
		User.findById(userId).populate('tasks').exec(function(err, tasks) {
			if (err) {
				console.log(err)
			}
			else {
				var openData = {
					owner: req.user._id,
					isCompleted: false
				}
				Task.find(openData).exec(function(err, openTask) {
					if (err) {
						console.log(err);
					}
					else {
						res.json(openTask)
					}
				})
			}
		})
	}

	if(filterState === 'completed') {
		User.findById(userId).populate('tasks').exec(function(err, tasks) {
			if (err) {
				console.log(err)
			}
			else {
				var completeData = {
					owner: req.user._id,
					isCompleted: true
				}
				Task.find(completeData).exec(function(err, completeTask) {
					if (err) {
						console.log(err);
					}
					else {
						res.json(completeTask)
					}
				})
			}
		})
	}


});

router.post('/:userId/task', function(req, res) {
	var userId = req.params.userId;
	var task = new Task ()

	console.log(userId);

	task.name = req.body.name
	task.owner = userId
	
	task.save(function(err, task) {
		if (err) {
			console.log(err)
			res.json({
				error: err
			})
		}
		else {
			var taskId = task._id;
			User.findByIdAndUpdate(userId, {
				$push: {tasks: taskId}},
				{safe: true, upsert: true},
				function(err, result) {
					if(err) {
						console.log(err);
					}
					else {
						User.findById(userId).populate('tasks').exec(function(err, tasks) {
							if (err) {
								console.log(err)
								return;
							}
								console.log("Success");
								res.json(tasks.tasks);
						})
					}
				}
			)

		}
	})

});

router.put('/:taskId', function(req, res){
	var taskId = req.params.taskId;
	var userId = req.user._id;
	var editTask = req.body.data;

	console.log(editTask);
	
	Task.findByIdAndUpdate(taskId, editTask, function(err, task) {
		if(err) {
			console.log("Failed", err);
		}

		User.findById(userId).populate('tasks').exec(function(err, tasks) {
			if (err) {
				console.log(err)
				return;
			}

			console.log("Success");
			res.json(tasks.tasks);
		})
	})
})

router.delete('/:taskId', function(req, res){
	var taskToDeleteId = req.params.taskId
	var userId = req.user._id

	Task.findByIdAndRemove(taskToDeleteId, function(err, task){
		if (err) {
			console.log("Failed", err)
		}
		else {
			var taskId = task._id;
			User.findByIdAndUpdate(userId, {
				$pull: {tasks: taskId}},
				{new: true, upsert: true},
				function(err, result) {
					if(err) {
						console.log(err);
					}
					else {
						User.findById(userId).populate('tasks').exec(function(err, tasks) {
							if (err) {
								console.log(err)
								return;
							}

								console.log("Success");
								res.json(tasks.tasks);
						})
					}
				}
			)
		}
	})
/*
		Task.find(function(err, tasks){
			if(err) {
				res.send(err);
			}
			res.json(tasks);
		})
	});
*/
})

module.exports = router;
