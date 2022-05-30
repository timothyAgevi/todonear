import { TaskStatus } from "../utils/enums";

@nearBindgen
export class Task{
    title:String;
    status:TaskStatus;
    id:i32;
}