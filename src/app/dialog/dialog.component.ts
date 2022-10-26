import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name:['',Validators.required],
      age:['',Validators.required],
      email_id:['',Validators.required],
      city_id:['',Validators.required]
    })
  }

}
