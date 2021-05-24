import { Injectable } from '@angular/core';
import * as data from './boarding-data.json';
import * as seatData from './seat-details.json';
import * as sequenceData from './boarding-sequence.json'
import { flatten } from 'lodash';
import { flattenDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  seats: any = (seatData as any).default;
  passengerData: any = (data as any).default;
  sequence: any = (sequenceData as any).default;
  soloPassengers: void;
  totalPassengers = []
  seat = ''
  i = 0;
  constructor() { }

  async prepareData() {

    await this.sortDataBasedOnSequence(this.passengerData);
    let passengerGroup = await this.groupPassengerData();
    await this.splitSoloAndGroup(passengerGroup);
    return this.totalPassengers;
//this.boardingFunction();

  }
  async splitSoloAndGroup(passengerGroup) {
    let soloPassengers = []
    let groupPassengers = []
    for (var key in passengerGroup) {
      if (passengerGroup.hasOwnProperty(key)) {
        if (passengerGroup[key] && passengerGroup[key].length > 1) {
          groupPassengers.push([passengerGroup[key]])
        }
        else if (passengerGroup[key] && passengerGroup[key].length == 1) {
          soloPassengers.push(passengerGroup[key][0])
        }
      }
    }

    console.log(soloPassengers)
    console.log(groupPassengers)
    if (groupPassengers.length) {
      groupPassengers = flattenDeep(groupPassengers)
    }
    if (soloPassengers.length && !groupPassengers.length) {
      this.totalPassengers = soloPassengers;
    }
    else if (groupPassengers.length && !soloPassengers.length) {
      this.totalPassengers = groupPassengers;
    }
    else if (groupPassengers.length && soloPassengers.length) {
      this.totalPassengers = [...soloPassengers, ...groupPassengers];
    }
    // if (this.totalPassengers.length) {
    //   await this.chunkArray(10)
    // }
  
    console.log(this.totalPassengers)
  }

  async sortDataBasedOnSequence(passengerGroup) {
    let sequenceOrder = flatten(this.sequence);
    passengerGroup.sort(function (a, b) {
      return sequenceOrder.indexOf(a.seat) - sequenceOrder.indexOf(b.seat);
    });
  }
  async sortPassengerData(passengerGroup) {
    var sortable = [];
    for (var passenger in passengerGroup) {
      sortable.push([passenger, passengerGroup[passenger]]);
    }
    sortable.sort(function (a, b) {
      return a[1].length - b[1].length;
    });
    return sortable;
  }
  async groupPassengerData() {
    return this.passengerData.reduce(function (rv, x) {
      (rv[x['id']] = rv[x['id']] || []).push(x);
      return rv;
    }, {});
  };

}
