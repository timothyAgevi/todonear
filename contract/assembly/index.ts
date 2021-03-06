import { Context } from "near-sdk-as";
import { Task } from "./Models/Task";
import { TaskInfo } from "./Models/TaskInfo";
import { TaskManager } from "./Models/TaskManager";
import { MY_TASKS } from "./utils/database";
// import { TaskManager } from "./Models/TaskManager";
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
    }//let 1st time signer
    const taskManager = new TaskManager()//intanstiate 
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
  showAllTask():Task[] | null{
    const signer=Context.sender;//get signer
    //check if key exists in collection
    if(MY_TASKS.contains(signer)){
      const taskManager=MY_TASKS.getSome(signer);
      return taskManager.getAllTasks();
    }
    return [];
   }
   //function to change state of task from pending to active
   startTask(taskId:i32):bool{//change from void to bool
    const signer=Context.sender;//get signer
    if(MY_TASKS.contains(signer)){
      const taskManager=MY_TASKS.getSome(signer);
     const isStarted=taskManager.startTask(taskId);
     MY_TASKS.set(signer,taskManager)//store startTask on blockchain
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
   MY_TASKS.set(signer,taskManager)//store completedTask on blockchain
   return isCompleted;
 }
 return false;
}
//function to remove task
removeTask(taskId:i32):Task |null{//change from void to bool
  const signer=Context.sender;//get signer
  if(MY_TASKS.contains(signer)){
    const taskManager=MY_TASKS.getSome(signer);//attach signer to task
   const task =taskManager.removeTask(taskId);
   MY_TASKS.set(signer,taskManager)//store removedTask on blockchain
   return task;
 }
 return null;
}
}