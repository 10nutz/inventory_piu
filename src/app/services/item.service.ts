import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly basUrl = "https://loclahost:44385/api/item/"
  constructor(public httpClient: HttpClient) { }

  getItems(): Observable<Item[]>{
    return this.httpClient.get(this.basUrl + "get") as Observable<Item[]>;
  }

  getItemById(id: number): Observable<Item>{
    return this.httpClient.get(this.basUrl + "getItems/" + id) as Observable<Item>;
  }

  // postItem(items: Items): Observable<Items>{
  //   return this.httpClient.delete(this.basUrl + "edit/" + id) as unknown as Observable<null>;
  // }

  deleteItem(id: number): Observable<null>{
    return this.httpClient.delete(this.basUrl + "delete/" + id) as unknown as Observable<null>;
  }

  editItem(item: Item): Observable<null>{
    return this.httpClient.put(this.basUrl + "edit/" + item.id, item) as unknown as Observable<null>;
  }
}

//pt body , Item: items   in get: , item
// https://localhost:44385/api/item/getItems/{id}
// https://localhost:44385/api/item/post
// https://localhost:44385/api/item/delete/{id}
// https://localhost:44385/api/item/edit/{id}
