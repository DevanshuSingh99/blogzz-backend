import mongoose from "mongoose";
import {} from "dotenv/config";
import { User } from "../model/users.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
//import { v4 as uuidv4 } from 'uuid';

export const getUsers = async (req, res) => {
     const { username, email, id, name, phoneNumber } = req.body;
     const filters = {};

     for (const key in req.body) req.body[key] ? (filters[key] = req.body[key]) : null;

     try {
          const users = await User.find(filters);
          return res.json(users);
     } catch (error) {
          return res.status(500).send(`Error:${error}`);
     }
};

export const createUser = async (req, res) => {
     const { name, email, username, password, phoneNumber } = req.body;

     try {
          let responseUser = await User.create({ name, email, username, password});
          responseUser.message="Registered";
          return res.status(200).json(responseUser);
     } catch (error) {
          return res.status(200).json(error.errors);
     }
};

export const deleteUser = async (req, res) => {
     try {
          const response = await User.findByIdAndDelete({ _id: req.body._id });
          return response ? res.json({ message: "User deleted." }) : res.json({ message: "User doesn't exists." });
     } catch (error) {
          return res.status(401).json(error.message);
     }
};

export const updateUser = async (req, res) => {
     return res.send(user);
};

export const loginUser = async (req, res) => {

     const { email, username, password } = req.body;

     // Check if a token is present and is valid -> RETURN "Authenticated"
     const authHeader = req.headers['accesstoken'];
     const token = authHeader && authHeader.split(" ")[0];

     if (token) {
          try {
               const tokenIsValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
               const user = await User.findOne(tokenIsValid._id);
               return tokenIsValid && res.status(200).json({user, message: "Authenticated" });
          } catch (error) {
               return res.status(200).json({ message: error.message });
          }
     }

     if ((!!email && !!username) || (!email && !username)) return res.status(400).json({ message: "Please provide either email or username." });
     if (!password) return res.status(400).json({ message: "Please enter a valid password." });

     try {
          /**
           * Search for the user with the email / username in the database.
           * If the user doesn't exists -> RETURN "Invalid credentials."
           * Compare the supplied password with the hashed password.
           * If the passwords match -> RETURN "Authenticated", JWT TOKEN, USER
           * Else RETURN "Invalid credentials."
           */
          const user = await User.findOne(email ? { email: email } : { username: username });
          if (!user) return res.status(200).json({ message: "Invalid credentials." });
          if (await compare(password, user.password)) {
               // login successful -> create a new JWT
               const accessToken = jwt.sign({ role: "user", id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 });
               return res.json({ message: "Authenticated", user:{id:user._id,name:user.name,username:user.username,email:user.email,}, accessToken });
          } else return res.json({ message: "Invalid credentials." });
     } catch (error) {
          return res.status(500).json(error.message);
     }
};
