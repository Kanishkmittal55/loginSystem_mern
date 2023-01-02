const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')



// @ desc - Get goals (right now it is getting all the goals but when we add user authentication it will only get a specific user goal
// @route - GET/api/goals
// @access - Private after we add authentication
const getGoals = asyncHandler(async (req, res) => {
 const goals = await Goal.find( {user: req.user.id})

    res.status(200).json(goals)
})




// @ desc - Set goal (right now it is getting all the goals but when we add user authentication it will only get a specific user goal
// @route - POST /api/goals - i.e. you will need to make a POST request
// @access - Private after we add authentication
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    
    res.status(200).json(goal)
})




// @ desc - Update goal (right now it is getting all the goals but when we add user authentication it will only get a specific user goal
// @route - PUT/api/goals/:id (How can you update everything, you can make an update at a specific entry that is why /:id)
// @access - Private after we add authentication
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)


    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')

    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedGoal)
})





// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
  
    if (!goal) {
      res.status(400)
      throw new Error('Goal not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    await goal.remove()
  
    res.status(200).json({ id: req.params.id })
  })




// Now to use this we use module.exports

module.exports = {
    getGoals, setGoal, updateGoal , deleteGoal
}