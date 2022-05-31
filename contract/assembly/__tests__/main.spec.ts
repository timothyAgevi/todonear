import { VMContext } from 'near-sdk-as';
import { Contract } from '../index';
import { Task } from '../Models/Task';
import { TaskInfo } from '../Models/TaskInfo';
import { TaskManager } from '../Models/TaskManager';
import { MY_TASKS } from '../utils/database';
//initialize contract and signer
const contract = new Contract();
const signer ='simimi.testnet';
let task:TaskInfo;

describe( 'Tasks',()=>{
  beforeEach(()=>{
VMContext.setSigner_account_id(signer);//VMContext mimics context while running neartests on local environment
 task =contract.newTask('Write backend code!');
  })

  it('Should add new Task',()=>{
const taskmanager:TaskManager =MY_TASKS.getSome(signer);
const myTasks  =taskmanager.tasks;//array of tasks

log(task);
expect(task.title).toStrictEqual(
  myTasks[task.id].title,
  "Expect equal object."
)
  })
//test retieving of added task
// const taskmanager:TaskManager= MY_TASKS.getSome(signer);
// const myTasks =taskmanager.tasks;
// const firstTask=<TaskInfo>contract.showTask(0);
// const allTasks=< Task[]>contract.showAllTask();

// expect(firstTask).not.toBeNull();
// expect(firstTask.title).toStrictEqual(myTasks[0].title);
// expect(allTasks.length).toStrictEqual(1);


})
