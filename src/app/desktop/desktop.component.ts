import { DataService } from './../data.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.less']
})
export class DesktopComponent {
  constructor(private spinner: NgxSpinnerService,
    private dataService: DataService,
    private router:Router) { }

  totalPassengers = []
  totalPassengersCopy = []
  isMobile;
  seat = ''
  i = 0;
  async ngOnInit() {
    await this.getData();


  }
  async getData() {
    this.totalPassengers = await this.dataService.prepareData();
    this.totalPassengersCopy = [...this.totalPassengers]
    if (this.totalPassengers) {
      this.boardingFunction();
    }
  }
  ngAfterViewInit() {
    //   console.log(this.spinner)
  }

  boardingFunction() {
    const self = this;
    if (self.totalPassengers) {
      setTimeout(function () {
        self.spinner.show()  //  call a 3s setTimeout when the loop is called
        let passenger = self.totalPassengers[self.i]
        if (passenger) {
          let element = document.getElementById(passenger.seat);
          self.seat = passenger.seat
          element['src'] = "./assets/black-icon.png";
          self.deletePassenger()
        } setTimeout(() => {
          self.spinner.hide();
        }, 27000);
        self.i++;                    //  increment the counter
        if (self.i < self.totalPassengers.length) {           //  if the counter < 10, call the loop function
          self.boardingFunction();             //  ..  again which will trigger another 
        }
        if (self.i == self.totalPassengers.length) {
          let seconds = self.totalPassengers.length * 30;
          var minutes = Math.floor(seconds / 60);
          var second = seconds - minutes * 60;
          setTimeout(() => {
            alert("All seats are booked,Total Booking Time: " + minutes + " minutes" + second + " seconds");
          }, 5000);
          return;
        }
      }, 30000)
    }
  }
  deletePassenger() {
    this.totalPassengersCopy.shift();
  }
 
}
