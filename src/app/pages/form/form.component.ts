import { Component, ViewEncapsulation, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';
export interface DialogData {
  idToBeEdit: number | undefined | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit{

  private itemToEdit: Item = new Item();
  form!: FormGroup;
  error!: string;

  //constructor(private formBuilder: FormBuilder){ }
  constructor(public dialogRef: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, public itemService: ItemService){}
  
  
  ngOnInit(): void {
    this.error = "";
    this.createForm();
    if(this.data.idToBeEdit !== 1){
      this.SetEditItem(this.data.idToBeEdit!);
    }
    
  }

  private createForm(): void{
    this.form=this.formBuilder.group({
      name:[null],
      description:[null],
      quantity:[null]
    });
  }


  private AddItem(newItem: Item): void{
     this.itemService.postItem(newItem).subscribe(() => {
      this.dialogRef.close();
      window.location.reload();
     }, (err) => {
        this.error=err.error;
     })
  }
  private UpdateItem(newItem: Item): void{
    this.itemService.editItem(newItem).subscribe(() => {
      this.dialogRef.close();
      window.location.reload();
    }, (err) => {
      this.error=err.error;
    })
  }

  SaveNewItem(): void{
    const isValid = this.form.valid;
    const newItem: Item = {
      ...this.itemToEdit,
      ...this.form.getRawValue()
    };
    if(!isValid){
      return;
    }

    if (this.data.idToBeEdit == 1)
      this.AddItem(newItem);
    else
      this.UpdateItem(newItem);
  }

  private SetEditItem(id: number): void{
    this.itemService.getItemById(id!).subscribe((item: Item) => {
      this.itemToEdit = item;
      this.form.patchValue(this.itemToEdit!, {
        emitEvent: false
      });
    });
  }
}
