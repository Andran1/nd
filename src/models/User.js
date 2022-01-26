const {model, Schema} = require('mongoose')

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: "Tasks"
  }]
});

UserSchema.set('toJSON', {
  transform: function (_, obj) {
    delete obj.password;
    obj.tasks.map(item => {
      delete item.owner
      delete item.__v
      return item
    })
    return obj;
  }
});

module.exports = model('User', UserSchema);