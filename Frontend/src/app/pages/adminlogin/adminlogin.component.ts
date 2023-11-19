import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  AdminSignIn(): void {
    this.apiService.userLogin(this.signInForm.value).subscribe((res: any) => {
      if (res !== null && res !== undefined && res.role === 'admin') {
        // User successfully logged in
        localStorage.setItem('admin', JSON.stringify(res));
        this.toastr.success('Successfully logged in.');
        this.router.navigate(['/admindashboard']);
      } else {
        // User is not authorized
        this.toastr.error('You are not authorized to access this page.');
        this.signInForm.reset();
      }
    }, (err) => {
      // Error occurred while logging in
      if (err.status === 401) {
        this.toastr.error('Incorrect email or password.');
      } else {
        this.toastr.error('An error occurred while logging in. Please try again later.');
      }
      this.signInForm.reset(); 
    });
  }

}