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
   return new TaskInfo(task,id);
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