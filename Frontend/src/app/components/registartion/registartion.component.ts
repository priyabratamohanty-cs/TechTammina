import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registartion',
  templateUrl: './registartion.component.html',
  styleUrls: ['./registartion.component.css']
})
export class RegistartionComponent implements OnInit {

  userDetails: FormGroup;

  constructor(private _formbuilder: FormBuilder,
    private _service: ApiService,
    private router: Router,
    private location:Location) { }

  ngOnInit() {
    this.userDetails = this._formbuilder.group({
      userId: ['', Validators.required],
      emailId:['',Validators.required],
      password: ['', Validators.required]
    })
  }


  onSubmit() {
    if (this.userDetails.invalid) {
      alert('Please Fill the Mandatory Fields')
    } else {
      this._service.registerUser(this.userDetails.value).subscribe(result=>{
        if(result.success){
          alert(result.message)
          this.router.navigate(['/login'])
        }else{
          alert(result.message);
        }
      }, error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 500) {
            alert('Sorry!! You are not authorized for this Action');
            this.router.navigate(['/401'])
          } else {
            alert('internal error occured')
          }
        } else {
          alert('internal error occured without any http error');
        }
      })
    }
  }

}
