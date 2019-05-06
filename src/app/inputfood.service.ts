import { Injectable } from '@angular/core';
import { Food } from './food';
import { FormGroup, FormControl, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InputfoodService {

  constructor() { }

  /*Adds conditional logic so form may recognize illegal/no imputs */
  form: FormGroup = new FormGroup({
    $key: new FormControl(null), /*aka the primary key _id: string;*/
    restname: new FormControl('',Validators.required),
    item: new FormControl('',Validators.required),
    calories: new FormControl('',[Validators.required,Validators.pattern("[0-9]*")]),
    carbohydrates: new FormControl('',[Validators.required,Validators.pattern("[0-9]*")]),
    protein: new FormControl('',[Validators.required,Validators.pattern("[0-9]*")]),
    total_fat: new FormControl('',[Validators.required,Validators.pattern("[0-9]*")]),
    type: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z]+")])
  });

  /*Initialize values when cleared*/
  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      restname: '',
      item:'',
      calories:'',
      carbohydrates:'',
      protein:'',
      total_fat:'',
      type: '',
    });
  }
}

