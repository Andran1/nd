const {Schema,model} = require("mongoose");

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.set('toJSON', {
  transform: function (_, obj) {
    delete obj.owner.tasks;
    return obj;
  }
});

module.exports = model("Tasks", taskSchema);
