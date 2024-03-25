export interface IListPostDto {
  name: string;
}

export interface IListPutDto {
  name: string;
  id: string;
}

export interface IItemsPostDto {
  description: string;
  listId:string;
}

export interface IItemsPutDto {
  description: string;
  id: string;
  isDone: boolean;
  listId: string;
}