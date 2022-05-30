import { Context } from "near-sdk-as";
import { Task } from "./Models/Task";
import { TaskInfo } from "./Models/TaskInfo";
import { MY_TASKS } from "./utils/database";

@nearBindgen
export class Contract{
  newTask(title:String):TaskInfo{
    //get wallet addres of who signed contract
    const signer=Context.sender;
    //check whetgher it first time signer is creating task
    if(MY_TASKS.contains(signer)){
      //if signer exists get taskmanager dtatype
      const taskManager = MY_TASKS.getSome(signer);
      const createdTask =taskManager.addTask(title);
       MY_TASKS.set(signer,taskManager)//store createdTask on blockchain
       return createdTask;
    }
    const taskManager = MY_TASKS.getSome(signer);
    const createdTask =taskManager.addTask(title);
     MY_TASKS.set(signer,taskManager)//store createdTask on blockchain
     return createdTask;
  }

  showTask(taskId:i32):TaskInfo | null{
     const signer=Context.sender;//get signer
     //check if key exists in collection
     if(MY_TASKS.contains(signer)){
       const taskManager=MY_TASKS.getSome(signer);
       return taskManager.getTask(taskId);
     }
     return null;
  }
//showAllTask function
  showTAllTask():Task[] | null{
    const signer=Context.sender;//get signer
    //check if key exists in collection
    if(MY_TASKS.contains(signer)){
      const taskManager=MY_TASKS.getSome(signer);
      return taskManager.getAllTask();
    }
    return [];
   }
   //function to change state of task from pending to active
   startTask(taskId:i32):bool{//change from void to bool
    const signer=Context.sender;//get signer
    if(MY_TASKS.contains(signer)){
      const taskManager=MY_TASKS.getSome(signer);
     const isStarted=taskManager.startTask(taskId);
     MY_TASKS.set(signer,taskManager)//store createdTask on blockchain
     return isStarted;
   }
   return false;
  }
//function to change state of task from pending to Completed
completeTask(taskId:i32):bool{//change from void to bool
  const signer=Context.sender;//get signer
  if(MY_TASKS.contains(signer)){
    const taskManager=MY_TASKS.getSome(signer);
   const isCompleted=taskManager.completeTask(taskId);
   MY_TASKS.set(signer,taskManager)//store createdTask on blockchain
   return isCompleted;
 }
 return false;
}
}