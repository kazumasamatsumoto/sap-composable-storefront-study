import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from '@spartacus/storefront';

import { App } from './app';
import { CartActionsModule } from './custom/cart-actions/cart-actions.module';
import { DemoBarModule } from './custom/demo-bar/demo-bar.module';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    SpartacusModule,
    DemoBarModule,
    CartActionsModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
