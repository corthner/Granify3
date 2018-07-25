import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GranifyAppServiceService {

  protected records: Person[];
  addCount: number;
  deleteCount: number;
  startTime: Date;
  currentTime: Date;
  public get hours(): number {
    return this.currentTime.getHours() - this.startTime.getHours() + 1;
  }
  public get addsPerHour(): number {
    return this.addCount / this.hours;
  }
  public get deletesPerHour(): number {
    return this.deleteCount / this.hours;
  }
  public get ratioAddsOverDeletesPerHour(): number {
      return this.addsPerHour / this.deletesPerHour;
  }

  //////////////////////////////////

  constructor() {
    this.records = [];
    this.addCount = 0;
    this.deleteCount = 0;
    this.startTime = new Date();
   }

   // return val:
   //  1 == record added successfully
   //  0 == record exists
   //  -1 == invalid inputs
  addRecord(name: string, number: string) {
    if ((name.length === 0) || (number.length === 0)) {
      return -1;
    }

    function matchPredicate(element, index, array): boolean {
      return (element.name === name && element.number === number);
    }

    if (this.records.findIndex(matchPredicate) < 0) {
      const newId = Person.generateId();
      this.records.push({id: newId, name: name, number: number});
      this.addCount++;
      return 1;
    }
    return 0;
   }

  //////////////////////////////////

  deleteRecord(id: string, name: string, number: string) {

    function matchPredicate(element, index, array): boolean {
      if ((name.length > 0) && (number.length > 0)) {
        return (element.name === name && element.number === number);
      }
      return (element.name === name || element.number === number);
    }

    const foundIndex = this.records.findIndex(matchPredicate);
    if (foundIndex >= 0) {
      this.records.splice(foundIndex, 1);
      this.deleteCount++;
      return true;
    }
    return false;
  }

  //////////////////////////////////

  findRecord(id: string, name: string, number: string) {
    function matchPredicate(element, index, array): boolean {
      if ((name.length > 0) && (number.length > 0)) {
        return (element.name === name && element.number === number);
      }
      return (element.name === name || element.number === number);
    }
    return this.records.find(matchPredicate);
  }

  //////////////////////////////////

  tick() {
    this.currentTime = new Date();
  }
}

export class Person {
  static idGenerator: number;
  id: string;
  name: string;
  number: string;

  static generateId() {
    Person.idGenerator++;
    return Person.idGenerator.toString().padStart(10, '0');
  }
}
Person.idGenerator = 0;
