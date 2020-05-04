import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent  {
  batchDetails: FormGroup;

  minStartDate;
  minEndDate;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  agePattern = "^((\\+91-?)|0)?[0-9]{2}$";
  disableAddbutton = false;

  constructor(private fb: FormBuilder,private apiService:ApiService ) {
    this.batchDetails = fb.group({
      batchName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]],
      startBatch: ['', Validators.required],
      endBatch: ['', Validators.required],
      candidateDetails: fb.array([
        this.fb.group({
          candidateName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(21)]],
          emailId: ["", [Validators.email]],
          mobileNo: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
          age: ['', [Validators.required, Validators.min(18), Validators.max(56)]]
        })
      ])
    })
    this.minStartDate = new Date();
    this.minEndDate = this.batchDetails.value.startBatch
  }

  setEndBatchMinDate() {
    this.minEndDate = this.batchDetails.value.startBatch
  }

  get getcandidateDetails() {
    return this.batchDetails.get("candidateDetails") as FormArray;
  }

  addNewcandidateDetails() {
    console.log("add new item details");
    this.getcandidateDetails.push(
      this.fb.group({
        candidateName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(21)]],
        emailId: ["", [Validators.email]],
        mobileNo: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        age: ['', [Validators.required, Validators.min(18), Validators.max(56)]]
      })
    );
    console.log(this.getcandidateDetails.controls[0].get('candidateName').valid);
  }

  deleteCandidateDetails(index){
    (this.batchDetails.get("candidateDetails") as FormArray).removeAt(index);
  }

  resetForm() {
    this.batchDetails.reset();
  }

  saveBatch(){
    console.log(this.batchDetails.value);
    if(this.batchDetails.valid){
      this.apiService.addBatch(this.batchDetails.value).subscribe(
        result=>{
          alert(result.message);
        },error => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 500) {
              alert('Sorry!! You are not authorized for this Action');
            } else {
              alert('internal error occured')
            }
          } else {
            alert('internal error occured without any http error');
          }
        }
      )
    }
  }

}