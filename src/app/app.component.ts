import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { KEY, URL } from '../../api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, CommonModule, HttpClientModule], // Include HttpClientModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bankUp';
  iban = '';
  bankName = '';
  displayResults = false;
  country = '';
  status = '';

  constructor(private http: HttpClient) {}

  onClick() {
    const headers = new HttpHeaders({
      'X-Api-Key': KEY, // Replace with your actual API key
    });

    this.http
      .get<any>(`${URL}iban=${this.iban}`, {
        headers,
      })
      .subscribe({
        next: (data) => {
          if (data && data.bank_name) {
            this.bankName = data.bank_name;
            this.country = data.country;
            this.status = 'valid';
            this.displayResults = true;
          } else {
            this.status = 'invalid';
            this.displayResults = false;
            this.iban = "";
            alert(
              'The IBAN you provided is either incorrect or not valid. Please try again.'
            );
          }
        },
        error: (err) => {
          console.error('Error fetching data', err);
          this.status = 'error';
          this.displayResults = false;
          alert(
            'An error occurred while validating the IBAN. Please try again later.'
          );
        },
      });
  }

  onClear() {
    this.displayResults = false;
    this.iban = '';
  }
}
