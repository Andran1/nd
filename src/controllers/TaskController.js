const TasksModel = require("../models/Tasks");
const UserModel = require("../models/User");

class TasksController {
  async index(req, res) {
    try {
      const tasks = await TasksModel.find({}).populate('owner').exec();
      res.status(201).send({
        data: tasks
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async create(req,res){
    try {
      const {name} = req.body;
      const task = await TasksModel
                    .create({name,owner: req.user._id})

      await UserModel.collection.updateMany(
        { '_id': task.owner }, { $push: { tasks: task._id } }
      )

      return res.json({
        data: task
      })
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getTaskById(req, res) {
    try {
      const {id} = req.params

      const task = await TasksModel.findById(id).populate('owner');

      if (!task) {
        return res.status(404).send({
          msg: "Not found"
        })
      }

      return res.status(200).send({
        data: task
      });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async removeAllTasks(req, res) {
    try {
      await TasksModel.deleteMany({})
      res.status(200).send({
        'msg': "Tasks deleted"
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

module.exports = new TasksController();
