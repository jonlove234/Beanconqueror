import {Component, Input, OnInit} from '@angular/core';
import {UIMillStorage} from '../../../services/uiMillStorage';
import {Mill} from '../../../classes/mill/mill';
import {ModalController} from '@ionic/angular';
import {UIToast} from '../../../services/uiToast';

@Component({
  selector: 'mill-add',
  templateUrl: './mill-add.component.html',
  styleUrls: ['./mill-add.component.scss'],
})
export class MillAddComponent implements OnInit {


  public data: Mill = new Mill();
  @Input() private hide_toast_message: boolean;
  constructor(private readonly modalController: ModalController,
              private readonly uiMillStorage: UIMillStorage,
              private readonly uiToast: UIToast) {

  }

  public ionViewWillEnter(): void {
  }
  public addMill(): void {

    if (this.data.name) {
      this.__addMill();
    }
  }

  public __addMill(): void {
    this.uiMillStorage.add(this.data);
    this.dismiss();
    if (!this.hide_toast_message) {
      this.uiToast.showInfoToast('TOAST_MILL_ADDED_SUCCESSFULLY');
    }
  }

  public dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    },undefined, 'mill-add')

  }
  public ngOnInit() {}

}
