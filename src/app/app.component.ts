import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    private deviceDetectorService: DeviceDetectorService,
    private router: Router) { }
  title = 'bus-boarding';
  isMobile;

  async ngOnInit() {
    //  await this.prepareData();
    // if (this.deviceDetectorService.isDesktop()) {
    //   this.router.navigate(['/desktop'])
    // }
    // if (this.deviceDetectorService.isMobile()) {
    //   this.router.navigate(['/mobile'])
    // }
    console.log(this.deviceDetectorService.isMobile())
    console.log(this.deviceDetectorService.isDesktop())

  }
  toDesktop(){
    this.router.navigate(['/desktop'])
  }
  toMobile(){
    this.router.navigate(['/mobile'])
  }

}
