export interface Todo {
  _id?:string;
  title:string;
  description:string;
  dateLimit:Date;
  priority:string;
}
export interface AddTodoResponse{
  success:boolean,
  message:string,
  todo:Todo
}
