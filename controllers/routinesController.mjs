import Routine from '../models/Routine.mjs';


const getAllRoutines = async (req, res) => {
   try {
      const routines = await Routine.find({})
         .sort({ title: 'desc' })
         .lean();
      res.send(routines).status(200);
   } catch (err) {
      console.error(err);
      res.status(500).send(err);
   }
};

const getRoutineById = async (req, res) => {
   try {
      const routine = await Routine.findById(req.params.id);
      if (routine) {
         res.send(routine).status(200);
      } else {
         res.send("We could not find a routine with that id").status(400);
      }
   } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
   }
};

const createRoutine = async (req, res) => {
   try {
      Routine.create({
         title: req.body.title,
         image: req.body.image
      })
   } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
   }
};

const updateRoutine = async (req, res) => {
   try {
      const updatedRoutine = await Routine.findOneAndUpdate(
         { _id: req.params.id },
         {
            $set: {
               title: req.body.title,
               image: req.body.image,
            },
         },
         { new: true, runValidators: true }
      );

      if (!updatedRoutine) {
         return res.status(404).json({ message: 'Cannot find routine' });
      }

      res.json(updatedRoutine);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

const deleteRoutine = async (req, res) => {
   try {
      const routine = await Routine.findByIdAndDelete(req.params.id);
      if (!routine) {
         return res.status(404).send({ message: 'Routine not found' });
      }
      res.send({ message: 'Routine deleted' });
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

export default { getAllRoutines, getRoutineById, createRoutine, updateRoutine, deleteRoutine };