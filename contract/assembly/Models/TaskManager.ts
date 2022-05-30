import { Task } from "./Task";

@nearBindgen
export class TaskManager{
tasks:Task[]=[];
//function to add task
addTask(title:String):void{
   const task =new Task(title);//initialze new task
   this.tasks.push(task);//add task to tasks array
}
//function to remove task

}