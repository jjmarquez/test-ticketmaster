import {
  Country,
  MatSelectCountryModule,
} from '@angular-material-extensions/select-country';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IDataFilter } from '../../models/events';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectCountryModule,
    MatCheckboxModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  now = new Date();
  _showLocation = signal(false);
  _showDates = signal(false);

  @Output('eventFilter') eventFilter: EventEmitter<IDataFilter> =
    new EventEmitter<IDataFilter>();

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      keyword: [''],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.f['startDateTime']) {
        this.f['startDateTime'].setValue(
          this.transformDate(this.f['startDateTime'].value)
        );
      }

      if (this.f['endDateTime'] && this.f['endDateTime'].value != '') {
        this.f['endDateTime'].setValue(
          this.transformDate(this.f['endDateTime'].value)
        );
      }

      this.eventFilter.emit(this.form.value);
    }
  }

  onCountrySelected(country: Country) {
    if (country) this.f['countryCode'].setValue(country.alpha2Code);
  }

  checkLocation($event: boolean) {
    this._showLocation.set($event);
    if (this._showLocation()) {
      this.form.addControl('countryCode', new FormControl(''));
      this.form.addControl('city', new FormControl(''));
    } else {
      this.form.removeControl('countryCode');
      this.form.removeControl('city');
    }
  }

  checkDates($event: boolean) {
    this._showDates.set($event);
    if (this._showDates()) {
      this.form.addControl(
        'startDateTime',
        new FormControl('', [Validators.required])
      );
      this.form.addControl('endDateTime', new FormControl(''));
    } else {
      this.form.removeControl('startDateTime');
      this.form.removeControl('endDateTime');
    }
  }

  transformDate(dateString: string): string {
    let auxDate = new Date(dateString);
    auxDate.setHours(0, 0, 0);
    return auxDate.toISOString().slice(0, -5) + 'Z';
  }

  get keyword() {
    return this.form.get('keyword') as FormControl;
  }
}
