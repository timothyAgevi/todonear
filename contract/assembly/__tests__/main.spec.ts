import { VMContext } from 'near-sdk-as';
import { Contract } from '../index';
import { Task } from '../Models/Task';
import { TaskInfo } from '../Models/TaskInfo';
import { TaskManager } from '../Models/TaskManager';
import { MY_TASKS } from '../utils/database';
import { TaskStatus } from '../utils/enums';
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
it('Should retrieve added task',()=>{
const taskmanager:TaskManager= MY_TASKS.getSome(signer);
const myTasks =taskmanager.tasks;//get array of tasks
const firstTask=<TaskInfo>contract.showTask(0);// show lastly added task
const allTasks=< Task[]>contract.showAllTask();//show allTasks

expect(firstTask).not.toBeNull();//first task should not be null
expect(firstTask.title).toStrictEqual(myTasks[0].title);
expect(allTasks.length).toStrictEqual(1);//if lenght is 1,since add 1 task @time
})
//function to check change of status of task
it('Should change the status of task',()=>{
  expect(contract.startTask(0)).toBeTruthy();//check if startTask method is truthy,change status from PENDING to ACTIVE
  contract.completeTask(0);//change stTUS from ACTIVE to COMPLETED
  const taskmanager:TaskManager=MY_TASKS.getSome(signer);
  const myTasks=taskmanager.tasks;//reteiving list of tasks from persistent collection
  expect(myTasks[0].status).toStrictEqual(TaskStatus.COMPLETED);//if task list's staus ==COMPLETED
})
})
