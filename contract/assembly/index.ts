import { Context } from "near-sdk-as";

@nearBindgen
export class Contract{
  newTask(title:String):void{
    //get wallet addres of who signed contract
    const signer=Context.sender;
  }
}