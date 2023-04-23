import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlticciService {

  // Define the base URL for the API endpoint
  private baseUrl = 'http://localhost:8080/alticci';

  // Define the base URL for the API endpoint
  constructor(private http: HttpClient) { }

  // Define a function to retrieve data from the API with a parameter "n"
  // This function returns an Observable of type "number"
  getAlticci(n: number): Observable<number> {
    // Construct the full URL by appending the parameter "n" to the base URL
    const url = `${this.baseUrl}/${n}`;
    // Send a GET request to the API endpoint with the constructed URL
    // Pipe the response to catch and handle any errors that may occur
    return this.http.get<number>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        // If the error status is 400, then the user provided a negative number, throw an error message for an invalid input parameter
        if (error.status === 400) {
          return throwError('Invalid input parameter. It has to be equal or greater than 0');
        }
        // If the error status is 400, then the user provided a letter / symbol throw an error message for an invalid input parameter
        if (error.status === 404) {
          return throwError('Invalid input parameter. It has to be a number (>0)');
        }
        // If the error is a client-side or network error, log the error message to the console
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          // If the error is a server-side error, log the error status and message to the console
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'The service is offline, please try again later.'
        );
      })
    );
  }
}
