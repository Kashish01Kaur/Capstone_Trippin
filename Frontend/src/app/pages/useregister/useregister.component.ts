import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useregister',
  templateUrl: './useregister.component.html',
  styleUrls: ['./useregister.component.scss']
})
export class UseregisterComponent{
  userData: FormGroup;  
  constructor(private fb: FormBuilder, private service: ApiService,private toastr: ToastrService,private router:Router) { 
    this.userData = new FormGroup({
      firstName: new FormControl('', [
       Validators.required,
       Validators.maxLength(10),
       Validators.minLength(3),
     ]),
     lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
    ]),
      email: new FormControl('', [
       Validators.required,
       Validators.maxLength(30),
       Validators.minLength(3),
       Validators.email
     ]),
      password: new FormControl('', [
       Validators.required,
       Validators.maxLength(10),
       Validators.minLength(3),
     ]),
     role: new FormControl('user', [ 
      Validators.required, 
    ]),
    
    contactNo: new FormControl('', []),
    travelExperienceLevel: new FormControl('', []),
    travelBudget: new FormControl('', [])

   });
  }
 
  Register() {
    this.service.userRegister(this.userData.value).subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.toastr.success('Registered Successfully!');
      this.router.navigateByUrl('/userlogin');
    }, (error) => {
      console.log(error);
    });
  }
  /* */

  /* ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required],
      contactNo: ['', Validators.required],
      travelExperienceLevel: ['', Validators.required],
      travelBudget: ['', Validators.required]
    });
  }

  onUserSignUp(): void {
    const formData = this.signUpForm.value;
    // console.log(formData); // Log the form data before submitting to the backend
    this.apiService.userRegister(formData).subscribe((res: any) => {
      
      localStorage.setItem('user', JSON.stringify(res));
      console.log(res);
    });
  } */
}