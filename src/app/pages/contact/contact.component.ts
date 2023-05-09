import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }
  form!: FormGroup;
  question!: string;
  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [null],
      fname: [null],
      sname: [null],
      question: []
    });
  }

  public sendQuestion(): void {
    const data = this.form.getRawValue();
    if (data.question === '' || data.fname === null || data.sname === null || data.email === null) {
      window.alert("All the fildes are required!");
    }
    else
    {
      window.alert("You're question has been sent!");
    }
  }
}
