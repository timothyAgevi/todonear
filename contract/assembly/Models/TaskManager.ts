import { Task } from "./Task";

@nearBindgen
export class TaskManager{
tasks:Task[]=[];
//function to add task
addTask(title:String):void{
   const task =new Task(title)
}
//function to remove task

}