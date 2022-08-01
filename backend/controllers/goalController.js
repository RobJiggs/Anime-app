//desc Get Goals
// @routes GET /api/goals
// @access Private
const getGoals=(req,res)=>{
    res.status(200).json({message: 'Get goals'})


}


//desc Set Goals
// @routes GET /api/goals
// @access Private
const setGoal=(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')

    }
    res.status(200).json({message: 'Set goals'})



}


//desc UPdate Goals
// @routes PUT /api/goals/:id
// @access Private
const updateGoal=(req,res)=>{
    res.status(200).json({message: `Update goal ${req.params.id}`})



}


//desc Delete Goals
// @routes Delete /api/goals
// @access Private
const deleteGoal=(req,res)=>{
    res.status(200).json({message: `Delete goal ${req.params.id}`})

}

module.exports= {
    getGoals,setGoal,updateGoal,deleteGoal

}