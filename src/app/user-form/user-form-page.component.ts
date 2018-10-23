import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form--page',
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.css']
})

export class UserFormPageComponent implements OnInit {
  @Input() userData: any;

  regiForm: FormGroup;  
  FirstName:string='';  
  LastName:string='';  
  Address:string='';  
  DOB:Date=null;  
  Gender:string='';  
  Blog:string='';  
  Email:string='';  
  IsAccepted:number=0; 
  constructor(private fb: FormBuilder , private http:HttpClient) { 
    this.regiForm = fb.group({  
      'FirstName' : [null, Validators.required],  
      'Address' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],  
      'Email':[null, Validators.compose([Validators.required,Validators.email])]
    });  
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.userData);
    if(this.userData){
      this.regiForm.patchValue({
       
        FirstName:this.userData.result.name, 
        Address:this.userData.result.address, 
        Email:this.userData.result.email, 
      
      })
    }

  }
  onChange(event:any)  
  {  

  }  

  updateUser(id){
    let data = {
       
      FirstName:this.userData.FirstName, 
      Address:this.userData.Address, 
      Email:this.userData.Email, 
    
    }
    this.http.put('https://gorest.co.in/public-api/users/'+id+
    '?access-token=07J57KaczxBrx6q2AUrFexhcFs7e9rzjJkv7',data).subscribe(data => {
      location.reload();
    });
  }

  
  // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  
     
  }  

}
