import { TaskStatus } from "../utils/enums";

@nearBindgen
export class Task{
    title:String;
    status:TaskStatus;
  // static title: any;
    //id:i32;

    constructor(title:String){
    this.title=title;
    this.status=TaskStatus.PENDING;
    
    }
}