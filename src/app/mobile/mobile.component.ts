import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../data.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.less']
})
export class MobileComponent implements OnInit {

  constructor(
    private dataService: DataService,
    public loadingController: LoadingController,
    public toastController: ToastController,
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
  async presentLoading(num) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: num + 'seat is getting booked',
      duration:27000
    });
    await loading.present();
  }
  async presentToast(string) {
    const toast = await this.toastController.create({
      message: string,
      duration: 20000
    });
    toast.present();
  }
  boardingFunction() {
    const self = this;
    if (self.totalPassengers) {
      setTimeout(function () {
          //  call a 3s setTimeout when the loop is called
        let passenger = self.totalPassengers[self.i]
        if (passenger) {
          let element = document.getElementById(passenger.seat);
          self.seat = passenger.seat
          self.presentLoading(passenger.seat)
          element['src'] = "./assets/black-icon.png";
          self.deletePassenger()
        }

        self.i++;                    //  increment the counter
        if (self.i < self.totalPassengers.length) {           //  if the counter < 10, call the loop function
          self.boardingFunction();             //  ..  again which will trigger another 
        }
        if (self.i == self.totalPassengers.length) {
          let seconds = self.totalPassengers.length * 30;
          var minutes = Math.floor(seconds / 60);
          var second = seconds - minutes * 60;
          let string=`Total Booking time ${minutes} minutes ${second} seconds`;
          self.presentToast(string);
        }
      }, 30000)
    }
  }
  deletePassenger() {
    this.totalPassengersCopy.shift();
  }
 
}
