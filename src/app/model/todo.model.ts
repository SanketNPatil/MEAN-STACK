export enum TodoStatus {
  OPEN = 'Open',
  CLOSE = 'Close'
}
export interface TodoModel {
    _id?: string;
    todotask: string;
    duedate?:string;
    todostatus:TodoStatus
    
  }