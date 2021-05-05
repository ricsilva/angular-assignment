import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyMaskConfig } from 'ng2-currency-mask';
import { trigger, transition, animate, style, state } from '@angular/animations'

import { Calculator } from 'src/app/model/calculator.model'

type PaneType = 'left' | 'right';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ".",
  precision: 2,
  prefix: "$ ",
  suffix: "",
  thousands: ","
};

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],

  animations: [
    trigger('toLeft', [
      transition(':enter', [
        style({ transform: 'translateX(240px)' }),
        animate('1500ms', style({ transform: 'translateX(0)' })),
      ])
    ]),
    trigger('fromRighttoLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ])
    ])
  ]
})
export class MortgageCalculatorComponent implements OnInit {

  activePane: PaneType = 'left';

  isSummaryOpen = false;

  calculator: Calculator;

  amortizationPeriodSelected = '1';
  paymentFrequencySelected = '12';
  mortgageAmount = 100000;
  interestRate = 5;

  numberPayments;
  mortgagePayment;
  principalPayment;
  interestPayments;
  totalCost;

  constructor(private http: HttpClient) { }

  readonly ROOT_URL = '/api/calculator';

  ngOnInit() {
    this.getCalculatorData();

  }

  getCalculatorData() {
    this.getCalculatorDataFromApi()
    .subscribe(data => {
      this.calculator = data;
    });
  }

  getCalculatorDataFromApi(): Observable<Calculator> {
    return this.http.get<Calculator>(`${this.ROOT_URL}`);
  }

  calculateMortgage() {
    this.isSummaryOpen = true;

    let amortizationNbr = parseInt(this.amortizationPeriodSelected, 10);
    let paymentFrequencyNbr = parseInt(this.paymentFrequencySelected, 10);
    let rate = this.interestRate;
    let amortizationTotal;

    if(rate > 1){
      rate = rate * 0.01;
    }else{
      rate = rate;
    }

    if(amortizationNbr <= 30){
      amortizationTotal = amortizationNbr * paymentFrequencyNbr;
    }else{
      amortizationTotal = amortizationNbr;
    }

    let monthlyRate = rate / paymentFrequencyNbr;
    let factor = Math.pow(monthlyRate + 1, amortizationTotal);

    let numerator = monthlyRate * factor;
    let denominator = factor - 1;

    let quotient =  numerator/denominator;

    this.numberPayments =  amortizationTotal;
    this.mortgagePayment = this.mortgageAmount * quotient;
    this.principalPayment = this.mortgageAmount;
    this.totalCost = this.mortgagePayment * amortizationTotal;
    this.interestPayments = this.totalCost - this.mortgageAmount;
  };
}
