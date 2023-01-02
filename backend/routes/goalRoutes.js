const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')


// The below two lines can be written like this also -

// Please refer notes if you dont understand.

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

    
module.exports = router