import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerComponent } from './pager.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange event when clicking next button', () => {
    component.totalPages = 5;
    component.currentPage = 2;
    fixture.detectChanges();
    spyOn(component, 'changePage');

    const nextButton = fixture.debugElement.query(
      By.css('button#next')
    ).nativeElement;
    nextButton.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.changePage).toHaveBeenCalled();
    });
  });

  it('should disable buttons at edge cases 1', () => {
    component.totalPages = 3;
    component.currentPage = 0;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(
      By.css('button.previous')
    ).nativeElement;
    const nextButton = fixture.debugElement.query(
      By.css('button#next')
    ).nativeElement;
    expect(prevButton.disabled).toBeTruthy();
    expect(nextButton.disabled).toBeFalsy();
  });

  it('should disable buttons at edge cases 2', () => {
    component.totalPages = 3;
    component.currentPage = 3;
    fixture.detectChanges();

    const prevButton = fixture.debugElement.query(
      By.css('button#previous')
    ).nativeElement;
    const nextButton = fixture.debugElement.query(
      By.css('button#next')
    ).nativeElement;
    expect(prevButton.disabled).toBeFalsy();
    expect(nextButton.disabled).toBeTruthy();
  });
});
