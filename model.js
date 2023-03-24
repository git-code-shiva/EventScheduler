const mongoose = require('mongoose');

const EventSchedulerSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
});
EventSchedulerSchema.set('timestamps', true);

mongoose.model('EventScheduler',EventSchedulerSchema);