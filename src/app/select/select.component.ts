import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

constructor(
    private deviceDetectorService: DeviceDetectorService,
    private router: Router) { }

  ngOnInit() {
  }
  toDesktop(){
    this.router.navigate(['/desktop'])
  }
  toMobile(){
    this.router.navigate(['/mobile'])
  }
}
