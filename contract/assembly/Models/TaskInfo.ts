import { TaskStatus } from "../utils/enums";


export class TaskInfo{
   title:String;
   status:TaskStatus;
   id:i32;

   constructor(title:String,status:TaskStatus,id:i32){
    this.title=title;
    this.status=TaskStatus.PENDING;
    
    }
}