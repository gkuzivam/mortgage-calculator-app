import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mortage-calculator',
  imports: [ReactiveFormsModule, CommonModule, CurrencyPipe],
  templateUrl: './mortage-calculator.component.html',
  styleUrls: ['./mortage-calculator.component.css']
})
export class MortageCalculatorComponent {

  noResult = true;
  monthlyRepayment = 0;
  totalRepayment = 0;

  mortageForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    years: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required),
    mortgageType: new FormControl('', Validators.required)
  });

  clearForm() {
    this.noResult = true;
    this.monthlyRepayment = 0;
    this.totalRepayment = 0;
  }

  calculateRepayments() {
    const amount = Number(this.mortageForm.value.amount) || 0;
    const years = Number(this.mortageForm.value.years) || 0;
    const rate = Number(this.mortageForm.value.rate) || 0;
    const mortgageType = this.mortageForm.value.mortgageType;



    const annualInterestRate = rate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - amount;
    const monthlyInterest = amount * monthlyInterestRate;


    console.warn(this.mortageForm.value);
    console.log(`Monthly payment: ${monthlyPayment.toFixed(2)}`);
    console.log(`Total payment: ${totalPayment.toFixed(2)}`);
    console.log(`Total interest: ${totalInterest.toFixed(2)}`);
    console.log(`Monthly interest: ${monthlyInterest.toFixed(2)}`);

    this.noResult = false;
    this.monthlyRepayment = mortgageType === 'repayment' ? monthlyPayment : monthlyInterest;
    this.totalRepayment = mortgageType === 'repayment' ? totalPayment : totalInterest;
    
  }
  

}
