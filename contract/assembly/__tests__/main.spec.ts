import { Contract } from '..';
import { Task } from '../Models/Task';

import { TaskManager } from '../Models/TaskManager';
import { MY_TASKS } from '../utils/database';
//initialize contract and signer
const contract = new Contract();
const signer ='simimi.testnet';

describe( 'Tasks',()=>{
  it('Should add new Task',()=>{
const taskmanager:TaskManager=MY_TASKS.getSome(signer);
const myTasks=taskmanager.tasks;//array of tasks
// log(Task)
expect(Task.title).toStrictEqual(
  myTasks[taskmanager.id].title,
  "Expect equal object."
)
  })
})
