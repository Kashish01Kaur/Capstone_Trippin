import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {
  searchText = '';
  myData: any[] = [];
  searchedResults: any[] = [];
  messages: number[] = Array(5).fill(0);
  currPage = 1; // paginator
  maxBudget = 0;
  travelStartDate = '';
  travelEndDate = '';

  constructor(private packages: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    const dropdownEl = document.querySelector('.dropdown-toggle');
  
    if (dropdownEl !== null) {
      new bootstrap.Dropdown(dropdownEl, {
        // Remove the container property here
      });
    }
    this.searchedResults = this.myData; 
  }

  getData(): void {
    this.packages.getPackages(this.currPage).subscribe({
      next: (data) => {
        console.log(data);
        this.myData = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  search(): void {

    if (this.searchText.trim() === '' && this.maxBudget <= 0) {
      this.searchedResults = this.myData;
    } else {
      this.searchedResults = this.myData.filter((pkg) => {
        const destination = pkg.destination.toLowerCase().trim();
        const search = this.searchText.toLowerCase().trim();
        const budget = this.maxBudget <= 0 || pkg.totalBudget <= this.maxBudget;
        const noOfDays = this.travelStartDate !== '' && this.travelEndDate !== '' ? this.calculateNoOfDays(pkg.noOfDays) <= this.calculateNoOfDays(this.getSelectedNoOfDays()) : true;

        return destination.includes(search) && budget && noOfDays;
      });
    }

    console.log(this.searchedResults);
  }

  calculateNoOfDays(noOfDays: number): number {
    const start = new Date(this.travelStartDate);
    const end = new Date(this.travelEndDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    console.log(`No of days for selected input: ${this.getSelectedNoOfDays()}, No of days for package ${noOfDays}: ${diffDays}`);

    return diffDays;
  }
  getSelectedNoOfDays(): number {
    const start = new Date(this.travelStartDate);
    const end = new Date(this.travelEndDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays;
  }

}