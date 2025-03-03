import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Device } from '@capacitor/device';
import { ITimer } from '../../interfaces/timer/iTimer';
import { DatetimePopoverComponent } from '../../popover/datetime-popover/datetime-popover.component';
import moment from 'moment';
import { ModalController, Platform } from '@ionic/angular';
import { Settings } from '../../classes/settings/settings';
import { UISettingsStorage } from '../../services/uiSettingsStorage';
import { CoffeeBluetoothDevicesService } from '../../services/coffeeBluetoothDevices/coffee-bluetooth-devices.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() public label: string;
  @Input('label-id') public labelId: string;
  @Input('hide-control-buttons') public hideControlButtons: boolean = false;
  @Output() public timerStarted = new EventEmitter();
  @Output() public timerPaused = new EventEmitter();
  @Output() public timerReset = new EventEmitter();
  @Output() public timerResumed = new EventEmitter();
  @Output() public timerTicked = new EventEmitter();

  public displayingTime: string = moment().startOf('day').toISOString();

  private startingDay;
  private startedTimer;
  private pausedTimer;
  private startedOffset;

  public timer: ITimer;
  public settings: Settings;
  private isIos16 = false;
  constructor(
    private readonly modalCtrl: ModalController,
    private readonly bleManager: CoffeeBluetoothDevicesService,
    private readonly uiSettingsStorage: UISettingsStorage,
    private readonly platform: Platform,
  ) {
    this.settings = this.uiSettingsStorage.getSettings();
    Device.getInfo().then((deviceInfo) => {
      this.isIos16 =
        this.platform.is('ios') && deviceInfo.osVersion.indexOf('16.') >= 0;
    });
  }

  private __preventEventClickOnIos(_event) {
    try {
      //Just do this on iOS 16.X...
      if (_event && this.isIos16) {
        _event.target.blur();
        _event.cancelBubble = true;
        _event.preventDefault();
        _event.stopImmediatePropagation();
        _event.stopPropagation();
      }
    } catch (ex) {}
  }

  public smartScaleConnected() {
    try {
      return this.bleManager.getScale() !== null;
    } catch (ex) {}
  }

  public ngOnInit(): void {
    this.initTimer();
  }

  public isTimerRunning() {
    return this.timer.runTimer;
  }

  public ngOnDestroy(): void {
    this.timer.runTimer = false;
  }

  public hasFinished(): boolean {
    return this.timer.hasFinished;
  }

  public returnWantedDisplayFormat() {
    const showMinutes: boolean = true;
    let showHours: boolean = false;
    let showMilliseconds: boolean = false;
    if (this.timer.seconds >= 3600) {
      showHours = true;
    }
    if (this.settings?.brew_milliseconds) {
      showMilliseconds = true;
    }

    let returnStr: string = '';
    if (showMilliseconds) {
      if (this.settings.brew_milliseconds_leading_digits === 3) {
        returnStr = '.SSS';
      } else if (this.settings.brew_milliseconds_leading_digits === 2) {
        returnStr = '.SS';
      } else {
        returnStr = '.S';
      }
    }
    if (showHours) {
      return 'H:mm:ss' + returnStr;
    } else if (showMinutes) {
      return 'mm:ss' + returnStr;
    } else {
      return 'ss' + returnStr;
    }
  }

  public initTimer(): void {
    this.timer = {
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      seconds: 0,
      milliseconds: 0,
    } as ITimer;

    this.displayingTime = moment(this.displayingTime)
      .startOf('day')
      .add('seconds', this.timer.seconds)
      .add('milliseconds', this.timer.milliseconds)
      .toISOString();
  }

  public startTimer(_resumed: boolean = false, _event = null) {
    this.__preventEventClickOnIos(_event);
    if (_resumed === false) {
      const startingDate = moment().toDate();
      this.startingDay = moment(startingDate).startOf('day');
      if (this.timer.seconds > 0 || this.timer.milliseconds > 0) {
        // We need to subtract, if the time is already given on start (like repeat or preset)
        this.startedTimer = moment(startingDate)
          .subtract(this.timer.seconds, 'seconds')
          .subtract(this.timer.milliseconds, 'milliseconds');
      } else {
        this.startedTimer = moment(startingDate);
      }

      this.startedOffset = this.startedTimer.diff(this.startingDay);
    } else {
      const restartTimer = moment(moment().toDate());

      this.startedOffset += restartTimer.diff(this.pausedTimer);
    }
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    if (this.settings?.brew_milliseconds) {
      this.millisecondTick();
    } else {
      this.timerTick();
    }

    if (_resumed === false) {
      this.timerStarted.emit();
    }

    this.changeEvent();
  }

  public pauseTimer(_event = null) {
    this.__preventEventClickOnIos(_event);
    this.pausedTimer = moment(moment().toDate());
    this.timerPaused.emit();
    this.timer.runTimer = false;
    this.timerPaused.emit();
    this.changeEvent();
  }

  public resumeTimer(_event = null) {
    this.__preventEventClickOnIos(_event);
    this.startTimer(true);
    this.timerResumed.emit();
  }

  public millisecondTick(): void {
    setTimeout(() => {
      if (!this.timer.runTimer) {
        return;
      }
      const milliSecondTimer = moment(moment().toDate()).subtract(
        this.startedOffset,
      );

      this.timer.milliseconds = milliSecondTimer.milliseconds();
      const passedSeconds = milliSecondTimer.diff(this.startingDay, 'seconds');
      this.timer.seconds = passedSeconds;

      this.displayingTime = moment(this.displayingTime)
        .startOf('day')
        .add('seconds', this.timer.seconds)
        .add('milliseconds', this.timer.milliseconds)
        .toISOString();
      this.millisecondTick();
    }, 10);
  }
  public timerTick(): void {
    setTimeout(() => {
      if (!this.timer.runTimer) {
        return;
      }

      const actualDate = moment().toDate();

      const actualTimerTick = moment(actualDate).subtract(this.startedOffset);

      const passedSeconds = actualTimerTick.diff(this.startingDay, 'seconds');
      this.timer.seconds = passedSeconds;

      this.displayingTime = moment(this.displayingTime)
        .startOf('day')
        .add('seconds', this.timer.seconds)
        .add('milliseconds', this.timer.milliseconds)
        .toISOString();

      this.timerTick();
      this.changeEvent();
    }, 10);
  }

  public getSeconds(): number {
    return this.timer.seconds;
  }
  public getMilliseconds(): number {
    return this.timer.milliseconds;
  }

  public reset(_event = null) {
    this.__preventEventClickOnIos(_event);
    this.timerReset.emit();
    this.initTimer();
    this.changeEvent();
  }

  public formatSeconds(): string {
    const secs = this.getSeconds();

    const formatted = moment.utc(secs * 1000).format('mm:ss');
    return formatted;
  }

  public changeEvent() {
    this.timerTicked.emit();
  }
  public setTime(seconds: number, milliseconds: number = 0): void {
    this.timer.seconds = seconds;
    if (milliseconds !== 0) {
      this.timer.milliseconds = milliseconds;
    }
    this.displayingTime = moment(this.displayingTime)
      .startOf('day')
      .add('seconds', this.timer.seconds)
      .add('milliseconds', this.timer.milliseconds)
      .toISOString();
  }

  public changeDate(_event) {
    const durationPassed = moment.duration(
      moment(_event).diff(moment(_event).startOf('day')),
    );
    this.displayingTime = moment(_event).toISOString();
    this.timer.seconds = durationPassed.asSeconds();
    // Emit event so parent page can do something
    this.changeEvent();
  }

  /**Somehow on devices an double/tripple click is triggered, and we can't fix this somehow, so we check if the popover is already shown and else ignore the triple tap**/
  private _overLaytimeShown: boolean = false;
  public async showTimeOverlay(_event) {
    if (this._overLaytimeShown === true) {
      return;
    }

    try {
      //Just do this on iOS 16.X...
      if (_event && this.isIos16) {
        if (_event.target.outerHTML.indexOf('<ion-input') >= 0) {
          /** If <ion-input is the start, the click was somehow done by the button, else just the "input" is clicked...
           * Thats why we return here, and ignore the click.
           */
          return;
        }
      }
    } catch (ex) {}
    _event.stopPropagation();
    _event.stopImmediatePropagation();
    this._overLaytimeShown = true;
    const modal = await this.modalCtrl.create({
      component: DatetimePopoverComponent,
      id: 'datetime-popover',
      cssClass: 'popover-actions',
      animated: false,
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.75,
      componentProps: { displayingTime: this.displayingTime },
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    this._overLaytimeShown = false;
    if (
      modalData !== undefined &&
      modalData.data &&
      modalData.data.displayingTime !== undefined
    ) {
      this.displayingTime = modalData.data.displayingTime;
      this.timer.seconds = moment
        .duration(
          moment(this.displayingTime).diff(
            moment(this.displayingTime).startOf('day'),
          ),
        )
        .asSeconds();
      this.timer.milliseconds = moment(this.displayingTime)
        .startOf('day')
        .milliseconds();
      // We need to calculate new, else when user starts timer again, the wrong times will be used
      const startingDate = moment().toDate();
      this.pausedTimer = moment(moment().toDate());
      this.startingDay = moment(startingDate).startOf('day');
      if (this.timer.seconds > 0 || this.timer.milliseconds > 0) {
        // We need to subtract, if the time is already given on start (like repeat or preset)
        this.startedTimer = moment(startingDate)
          .subtract(this.timer.seconds, 'seconds')
          .subtract(this.timer.milliseconds, 'milliseconds');
      } else {
        this.startedTimer = moment(startingDate);
      }

      this.startedOffset = this.startedTimer.diff(this.startingDay);

      this.changeEvent();
    }
  }
}
