import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

import { AppComponent } from './app.component';
import { CustomCurrencyMaskConfig, MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';
import { MaterialModule } from './material.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/mortgage-calculator',
    pathMatch: 'full'
  },
  {
    path: 'mortgage-calculator',
    component: MortgageCalculatorComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    MortgageCalculatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
