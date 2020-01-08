require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('5e10aafe064ea585640164f8').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(id, taskStatus) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: taskStatus})
    return count
}

deleteTaskAndCount('5e10aa0fe4e6dc854b1d0f83', false).then((count) => {
    console.log('Number of tasks need finish: ', count)
}).catch((e) => {
    console.log(e)
})