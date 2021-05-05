import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { of } from 'rxjs';

import { MortgageCalculatorComponent } from './mortgage-calculator.component';
import { Calculator } from '../model/calculator.model';

describe('vm.MortgageCalculatorComponent', () => {
  let mortgageCalcularComponent: MortgageCalculatorComponent;
  let fixture: ComponentFixture<MortgageCalculatorComponent>;

  const calculator: Calculator =
  {
    amortizationPeriod: [
      {
        value: "1",
        viewValue: "1 Year"
      }
    ],
    paymentFrequency: [
      {
        value: "52",
        viewValue: "Weekly"
      }
    ]
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MortgageCalculatorComponent
      ],
      imports: [
        MatTableModule,
        MatChipsModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageCalculatorComponent);
    mortgageCalcularComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(mortgageCalcularComponent).toBeTruthy();
  });

});
