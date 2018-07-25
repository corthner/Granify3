import { Component, DoCheck } from '@angular/core';
import { GranifyAppServiceService, Person } from './granify-app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck {

  protected static AddModalId = 'addModal';
  protected static DisplayModalId = 'displayModal';
  protected static DisplayInfoId = 'displayInfo';
  protected static DeleteModalId = 'deleteModal';
  title = 'Granify App';
  inputName: string;
  inputNum: string;
  displayId: string;
  displayName: string;
  displayNumber: string;

  //////////////////////////////////

  constructor(protected appService: GranifyAppServiceService) {
   }

  //////////////////////////////////

  onCloseModal(id: string) {
    const modal = document.getElementById(id);
    modal.style.display = 'none';
  }

  //////////////////////////////////

  openModal(id: string) {
    this.inputName = '';
    this.inputNum = '';
    const modal = document.getElementById(id);
    modal.style.display = 'block';
  }

  //////////////////////////////////

  onNoRecordFound() {
    alert('No record found.');
  }

  //////////////////////////////////

  ngDoCheck() {
    this.appService.tick();
  }

  //////////////////////////////////

  onDelete(event: any) {
    this.onCloseModal(AppComponent.DeleteModalId);
    if (!this.appService.deleteRecord('', this.inputName,  this.inputNum.toString())) {
      this.onNoRecordFound();
    }
  }

  //////////////////////////////////

  onAdd(event: any) {
    const addBtn = document.getElementById('addBtn');
    const addRetval = this.appService.addRecord(this.inputName, this.inputNum.toString());
    switch (addRetval) {
      case 0:
        alert('Record already exists.');
        break;
      case 1:
        this.onCloseModal(AppComponent.AddModalId);
        break;
      case -1:
        break;
    }
  }

  //////////////////////////////////

  onDisplay(event: any) {
    this.displayId = '';
    this.displayName = '';
    this.displayNumber = '';
    const displayRecord = this.appService.findRecord('', this.inputName,  this.inputNum.toString());
    if (displayRecord != null) {
      document.getElementById(AppComponent.DisplayInfoId).style.display = 'block';
      this.displayId = displayRecord.id;
      this.displayName = displayRecord.name;
      this.displayNumber = displayRecord.number;
    } else {
      this.onNoRecordFound();
      this.onCloseDisplayInfo();
    }
  }

  //////////////////////////////////

  onCloseDisplayModal() {
    this.onCloseDisplayInfo();
    this.onCloseModal(AppComponent.DisplayModalId);
  }

  //////////////////////////////////

  onCloseDisplayInfo() {
    document.getElementById(AppComponent.DisplayInfoId).style.display = 'none';
  }
}
