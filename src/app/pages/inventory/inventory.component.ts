import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  itemList!: Item[];
  error!: String;  
  id: number = 2;
  
  constructor(public dialog:MatDialog, public itemService: ItemService){}

  async openDialog(id?: number) {
    const dialogRef = this.dialog.open( FormComponent , {
      width: '400px',
      height: '400px',
      data: { idToBeEdit: id },
    });
  }


  getItems(): void{
    this.itemService.getItems().subscribe((list: Item[]) => {
      this.itemList = list;
    }, (err) => {
      this.error=err.error;
      //sanckbar
      })
  }

  deleteItem(id: number | undefined): void{
    this.itemService.deleteItem(id!).subscribe(() => {
      window.location.reload();
    }, (err) => {
      this.error=err.error;

    })
  }

  // editItem(item: Item): void{
  //   this.itemService.editItem(item).subscribe(() => {
  //     window.location.reload();
  //   }, (err) => {
  //     this.error=err.error;

  //   })
  // }

  ngOnInit(): void {
    this.getItems();
  }

}
