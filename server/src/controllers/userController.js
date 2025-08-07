import { fetchUsers } from '../services/userService.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
