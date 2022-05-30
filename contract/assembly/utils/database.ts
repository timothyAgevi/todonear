import { PersistentMap } from "near-sdk-as";
import { TaskManager } from "../Models/TaskManager";

export const MY_TASKS= new PersistentMap<String,TaskManager> ('t');// 1st param=data type, 2nd=data it will store. ('t')prefix 4 every key ofthe map