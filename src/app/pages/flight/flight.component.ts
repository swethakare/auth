import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { FlightInfoPayload } from '../../models/flight-info-payload';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
  router = inject(Router);
  authService = inject(AuthService);
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit(): void {
    if (!this.authService.getUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
  flightObj: FlightInfoPayload = {
    airline: '',
    arrivalDate: '',
    arrivalTime: '',
    flightNumber: '',
    numOfGuests: 0,
    comments: ''
  };

  onSubmit() {
    this.errorMessage = this.validateFlightInfo();

    if (this.errorMessage) {
      this.successMessage = null;
      return;
    }
    const apiUrl = "https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge";
    const headers = {
      'Content-Type': 'application/json',
      'token': 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh',
      'candidate': 'Swetha Kare'
    };
    axios.post(apiUrl, this.flightObj, { headers })
      .then(response => {
        const res = response.data;
        if (res) {
          this.successMessage = "Flight info saved successfully";
          this.errorMessage = null;
          this.router.navigate(['/success']);
        } else {
          this.errorMessage = res.message || "Failed to save flight info";
          this.successMessage = null;
        }
      })
      .catch(error => {
        console.error("Error occurred while saving flight info:", error);
        this.errorMessage = "An error occurred while saving flight info";
        this.successMessage = null;
      });
  }
  validateFlightInfo(): string | null {
    const { airline, arrivalDate, arrivalTime, flightNumber, numOfGuests } = this.flightObj;
    if (!airline || !arrivalDate || !arrivalTime || !flightNumber || !numOfGuests) {
      return "All fields airline, arrivalDate, arrivalTime, flightNumber, numberOfGuests are required.";
    }
    const parsedDate = new Date(arrivalDate);
    if (isNaN(parsedDate.getTime())) {
      return "Invalid date format. Use YYYY-MM-DD.";
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(arrivalTime)) {
      return "Invalid time format. Use HH:MM.";
    }
    return null;
  }
}
