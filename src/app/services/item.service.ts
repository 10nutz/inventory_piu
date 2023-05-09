import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly basUrl = "http://localhost:8081/api/"
  constructor(public httpClient: HttpClient) { }

  getItems(): Observable<Item[]>{
    return this.httpClient.get(this.basUrl + "items") as Observable<Item[]>;
  }

  getItemById(id: number): Observable<Item>{
    return this.httpClient.get(this.basUrl + "items/" + id) as Observable<Item>;
  }

  postItem(item: Item): Observable<Item>{
    return this.httpClient.post(this.basUrl + "create", item) as unknown as Observable<Item>;
  }

  deleteItem(id: number): Observable<null>{
    return this.httpClient.delete(this.basUrl + "item_delete/" + id) as unknown as Observable<null>;
  }

  editItem(item: Item): Observable<null>{
    return this.httpClient.put(this.basUrl + "item_update/" + item.id, item) as unknown as Observable<null>;
  }
}

//pt body , Item: items   in get: , item
// https://localhost:44385/api/item/getItems/{id}
// https://localhost:44385/api/item/post
// https://localhost:44385/api/item/delete/{id}
// https://localhost:44385/api/item/edit/{id}
