import { Task } from "./Task";

@nearBindgen
export class TaskManager{
tasks:Task[]=[];
//function to add task
addTask(title:String):void{
   const task =new Task(title);//initialze new task
   const id =this.tasks.push(task);//add task to tasks array,push return index which it has bn push into
   return 
}
//function to remove task

}