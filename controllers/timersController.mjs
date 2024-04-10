import Timer from '../models/Timer.mjs';


const getAllTimers = async (req, res) => {
   try {
      const timers = await Timer.find({})
         .sort({ title: 'desc' })
         .lean();
      res.send(timers).status(200);
   } catch (err) {
      console.error(err);
      res.status(500).send(err);
   }
};

const getTimerById = async (req, res) => {
   try {
      const timer = await Timer.findById(req.params.id);
      if (timer) {
         res.send(timer).status(200);
      } else {
         res.send("We could not find a timer with that id").status(400);
      }
   } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
   }
};

const createTimer = async (req, res) => {
   try {
      Timer.create({
         title: req.body.title,
         image: req.body.image,
         eventId: req.body.eventId,
      })
      res.status(201).send({message: "Timer Created"});
   } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
   }
};

const updateTimer = async (req, res) => {
   try {
      const updatedTimer = await Timer.findOneAndUpdate(
         { _id: req.params.id },
         {
            $set: {
               title: req.body.title,
               image: req.body.image,
               eventId: req.body.eventId,
            },
         },
         { new: true, runValidators: true }
      );

      if (!updatedTimer) {
         return res.status(404).json({ message: 'Cannot find timer' });
      }

      res.json(updatedTimer);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

const deleteTimer = async (req, res) => {
   try {
      const timer = await Timer.findByIdAndDelete(req.params.id);
      if (!timer) {
         return res.status(404).send({ message: 'Timer not found' });
      }
      res.send({ message: 'Timer deleted' });
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

export default { getAllTimers, getTimerById, createTimer, updateTimer, deleteTimer };