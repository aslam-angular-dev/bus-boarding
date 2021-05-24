import { SelectComponent } from './select/select.component';
import { MobileComponent } from './mobile/mobile.component';
import { DesktopComponent } from './desktop/desktop.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { IonicModule } from '@ionic/angular';
import { DataService } from './data.service';
@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    MobileComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    IonicModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    IonicModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService, DeviceDetectorService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
