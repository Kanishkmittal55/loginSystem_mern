const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// How to protect a route ? We do it with middleware , middleware is a function that run between the request response cycle.
// @desc Get user tickets
// @route - GET /api/tickets
// @access - Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getTickets" });
});

// @desc CREATE new tickets
// @route - POST /api/tickets
// @access - Private
const createTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "create Tickets" });
});

module.exports = {
  getTickets,
  createTickets
};
