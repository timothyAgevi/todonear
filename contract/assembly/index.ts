import { Context } from "near-sdk-as";
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
  
}