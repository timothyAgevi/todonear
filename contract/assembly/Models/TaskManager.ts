import { TaskStatus } from "../utils/enums";
import { Task } from "./Task";
import { TaskInfo } from "./TaskInfo";

@nearBindgen
export class TaskManager{

//array of tasks
tasks:Task[]=[];
 

//function to add task
addTask(title:String):TaskInfo{
   const task =new Task(title);//initialze new task object
   const id =this.tasks.push(task);//add task to tasks array,push return index which it has bn push into
   return new TaskInfo(task,id -1);
}
//function to view creted task
getTask(taskId:i32):TaskInfo |null{
    if(taskId >=this.tasks.length)return null;  
    const task= this.tasks[taskId];
    return new TaskInfo(task,taskId);
}
//function to show all tasks
getAllTasks():Task[]{
    return this.tasks;
}

//function to remove task
removeTask(taskId:i32): Task | null{
if(taskId >=this.tasks.length)return null;//check if task exists
const tmpTasks:Task[]=[];
let removedTask:Task | null=null ;
for(let i= 0;i<this.tasks.length; i++){
    const task =this.tasks[i];
    if(taskId !==i){
        tmpTasks.push(task);//index of current task
    }else{
      removedTask =task;  
    }
}
this.tasks=tmpTasks;
return removedTask;
}

//function to update status of task
startTask(taskId:i32):bool{
   //check if task id is available 
   if(taskId >=this.tasks.length)return false;
   this.tasks[taskId].status=TaskStatus.ACTIVE;
   return true;
}
//function to change state of task to Completed
completeTask(taskId:i32):bool{
    //check if task id is available 
    if(taskId >=this.tasks.length)return false;
    this.tasks[taskId].status=TaskStatus.COMPLETED;
    return true;
 }
}