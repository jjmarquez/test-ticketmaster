import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pager',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss',
})
export class PagerComponent implements OnInit {
  @Input('totalPages') totalPages: number = 0;
  @Input('currentPage') currentPage: number = 0;
  @Output('pageChange') prevOrNext: EventEmitter<number> =
    new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  changePage(eventData: any) {
    if (this.currentPage >= 0 && this.totalPages) {
      console.log(eventData.target.innerText.trim().toLowerCase());
      eventData.target.innerText.trim().toLowerCase() === 'prev'
        ? (this.currentPage -= 1)
        : (this.currentPage += 1);

      if (0 <= this.currentPage && this.currentPage < this.totalPages) {
        this.prevOrNext.emit(this.currentPage);
      }
    }
  }
}
