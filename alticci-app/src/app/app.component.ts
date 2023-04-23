import { Component } from '@angular/core';
import { AlticciService } from './services/alticci.service';
import { Observable } from 'rxjs';

@Component({
  // Selector for this component to be used in the HTML markup
  selector: 'app-root',
  // The template HTML file for this component
  templateUrl: './app.component.html',
  // The CSS file for this component
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Initialize a variable for the input parameter "n" to 0
  n: number = 0;
  // Initialize a variable for the result of the API call to null
  result: number | null = null;
  // Initialize a variable for any errors that may occur to null
  error: string | null = null;
  // Initialize a variable for the title of the app
  title = 'alticci-app';

  // Inject the AlticciService into the constructor
  constructor(private alticciService: AlticciService) {}

  // Define a function to handle the form submission
  onSubmit() {
    // Reset the error and result variables to null before making the API call
    this.error = null;
    this.result = null;
    // Call the getAlticci function from the AlticciService with the input parameter "n"
    // Subscribe to the observable to handle the response and any errors that may occur
    this.alticciService.getAlticci(this.n).subscribe(
      // If the API call is successful, assign the result to the result variable
      result => this.result = result,
      // If an error occurs, assign the error message to the error variable
      error => this.error = error
    );
  }
}
