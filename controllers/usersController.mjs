// import db from '../data/data.mjs';

import User from "../models/User.mjs";


const getAllUsers = async (req, res) => {
   try {
      const users = await User.find({})
         .sort({ username: 'asc' })
         .lean()

      res.send(users).status(200);
   } catch (err) {
      console.error(err);
      res.status(500).send(err);
   }
};

const getUserById = async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      if (user) {
         res.send(user).status(200);
      } else {
         res.send("We could not find a user with that id").status(400);
      }
   } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
   }
};

const createUser = async (req, res, next) => {
   const user = new User({
      googleId: req.profile.id,
      displayName: req.profile.displayName,
      email: req.profile.emails[0].value,
      firstName: req.profile.name.givenName,
      lastName: req.profile.name.familyName,
      image: req.profile.photos[0].value,
   });
   try {
      await user.save();
      res.status(201).send(user);
   } catch (err) {
      res.status(400).send({ message: err.message });
   }
};

const updateUser = async (req, res) => {
   try {
      const updatedUser = await User.findOneAndUpdate(
         { _id: req.params.id },
         {
            $set: {
               googleId: req.body.googleId,
               displayName: req.body.displayName,
               email: req.body.email,
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               image: req.body.image,
            },
         },
         { new: true, runValidators: true }
      );

      if (!updatedUser) {
         return res.status(404).json({ message: 'Cannot find user' });
      }

      res.json(updatedUser);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

const deleteUser = async (req, res) => {
   try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
         return res.status(404).send({ message: 'User not found' });
      }
      res.send({ message: 'User deleted' });
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };