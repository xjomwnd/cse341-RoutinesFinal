// import db from '../data/data.mjs';
import Event from '../models/Event.mjs';



const getAllEvents = async (req, res) => {
   try {
      const events = await Event.find({})
         .sort({ createdAt: 'desc' })
         .lean()

      res.send(events).status(200);
   } catch (err) {
      console.error(err);
      res.status(500).send(err);
   }
};

const getEventById = async (req, res) => {
   try {
      let event = await Event.findById(req.params.id).populate('user').lean()
      if (!event) {
         res.status(404).send('404');
      }
      if (event.user._id != req.user.id) {
         res.status(404).send('404');
      } else {
         res.send(event).status(200);
      }
   } catch (err) {
      console.error(err)
      res.send('There was a problem rendering this event');
   }
};

const createEvent = async (req, res) => {
   try {
      console.log(req.body);
      let event = await Event.findOne({ title: req.title });
      if (event) {
         send("This event already exists").status("400");
      } else {
         event = new Event({
            title: req.body.title,
            image: req.body.image,
         });
         await event.save();
         res.redirect('/events')
      }
   } catch (err) {
      console.error(err);
      res.send('There was an error creating your event.');
   }
};

const updateEvent = async (req, res) => {
   res.send('hello');
};

const deleteEvent = async (req, res) => {
   res.send('hello');
};

export default { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };