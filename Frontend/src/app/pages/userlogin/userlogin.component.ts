import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  UserSignIn(): void {
    this.apiService.userLogin(this.signInForm.value)
      .subscribe((res: any) => {
        if (res !== null && res !== undefined && res.role === 'user') {
          // User successfully logged in as a user
          localStorage.setItem('user', JSON.stringify(res));
          this.toastr.success('Successfully logged in as user.');
          this.router.navigate(['/userdashboard']);
        } else {
          // User is not authorized
          this.toastr.error('You are not authorized to access this page as a user.');
          this.signInForm.reset();
        }
      }, (err) => {
        // Error occurred while logging in
        if (err.status === 401) {
          this.toastr.error('Incorrect email or password.');
        } else {
          console.log(err);
        }
        this.signInForm.reset(); 
      });
  }
}