import { Task } from "./Task";
import { TaskInfo } from "./TaskInfo";

@nearBindgen
export class TaskManager{
tasks:Task[]=[];
//function to add task
addTask(title:String):TaskInfo{
   const task =new Task(title);//initialze new task
   const id =this.tasks.push(task);//add task to tasks array,push return index which it has bn push into
   return new TaskInfo(task,id)
}
//function to remove task

}