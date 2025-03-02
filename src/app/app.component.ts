import { Component } from '@angular/core';
import { MortageCalculatorComponent } from "./mortage-calculator/mortage-calculator.component";

@Component({
  selector: 'app-root',
  imports: [ MortageCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mortgage-calculator-app';
}
