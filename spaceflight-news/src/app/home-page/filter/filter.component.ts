import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  public filterValue = '';

  @Input()
  public set keywords (keywords: string) {
    this.filterValue = keywords.replaceAll(',', ' ')
  }

  @Output()
  onKeywordChange = new EventEmitter<string>();

  constructor(){}

  search(value: string) {
    const keywords = value.trim().replace(/\s\s+/g, ' ').replaceAll(' ', ',');
    this.onKeywordChange.emit(keywords);
  }
}
