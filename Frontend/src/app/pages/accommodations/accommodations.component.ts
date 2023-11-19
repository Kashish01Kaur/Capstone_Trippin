import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
interface Review {
  reviewDescription: string;
  rating: number;
}

interface Accomodation {
  hotelName: string;
  hotelDescription: string;
  hotelImage: string;
  stayAmt: number;
  reviews: Review[];
  showReviewsPopup?: boolean;
}
@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent implements OnInit {
  searchText = '';
  mypackageId: any;
  myAccomodations: any[] = [];
  searchedResults: any[] = [];
  Id: any;
  maxBudget = 0;

  constructor(private route: ActivatedRoute, private packages: ApiService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.mypackageId = this.route.snapshot.params['packageId'];

    this.packages.getPackagesById(this.mypackageId).subscribe((res) => {
      this.myAccomodations = res.accommodations;
      console.log(this.myAccomodations);
    });

    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.Id = userObject.userId;
      console.log(this.Id);
    }

    this.searchedResults = this.myAccomodations;
  }

  search(): void {

    if (this.searchText.trim() === '' && this.maxBudget <= 0) {
      this.searchedResults = this.myAccomodations;
    } else {
      this.searchedResults = this.myAccomodations.filter((pkg) => {
        const accomodation = pkg.hotelName.toLowerCase().trim();
        const search = this.searchText.toLowerCase().trim();
        const budget = this.maxBudget <= 0 || pkg.stayAmt <= this.maxBudget;
        return accomodation.includes(search) && budget;
      });
    }
  }

  addAccommodationToItinerary(item:any) {
    this.packages.addAccommodationToItinerary(this.Id, item)
      .subscribe(
        response => {
          console.log(response);
          alert('Accomodation added to Itinerary');
        },
      );
  }
  
  // Method to display the reviews popup
  showReviews(pkg: Accomodation) {
    pkg.showReviewsPopup = true;
  }

  // Method to hide the reviews popup
  hideReviews(pkg: Accomodation) {
    pkg.showReviewsPopup = false;
  }
  
}