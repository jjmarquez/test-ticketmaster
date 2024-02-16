import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormComponent } from './event-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, EventFormComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    const formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
      keyword: [''],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the controls for the date range', () => {
    component.checkDates(true);
    fixture.detectChanges();

    expect(component.form.get('startDateTime')).toBeDefined();
    expect(component.form.get('endDateTime')).toBeDefined();
  });

  it('should remove the controls for the date range', () => {
    component.checkDates(false);
    fixture.detectChanges();

    expect(component.form.get('startDateTime')).toBeNull();
    expect(component.form.get('endDateTime')).toBeNull();
  });

  it('should transform dates and emit eventFilter when form is valid', () => {
    fixture.detectChanges();
    // Set initial form values
    const formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
      keyword: [''],
    });

    component.checkDates(true);
    component.keyword.setValue('test');
    component.f['startDateTime'].setValue('2024-02-17');
    component.f['endDateTime'].setValue('2024-02-20');

    const eventFilterSpy = spyOn(component.eventFilter, 'emit');

    component.onSubmit();

    component.f['startDateTime'].setValue(
      component.transformDate(component.f['startDateTime'].value)
    );

    component.f['endDateTime'].setValue(
      component.transformDate(component.f['endDateTime'].value)
    );

    expect(component.f['startDateTime'].value).toEqual('2024-02-16T04:00:00Z');
    expect(component.f['endDateTime'].value).toEqual('2024-02-19T04:00:00Z');
    expect(eventFilterSpy).toHaveBeenCalledWith({
      keyword: 'test',
      startDateTime: '2024-02-16T04:00:00Z',
      endDateTime: '2024-02-19T04:00:00Z',
    });
  });
});
