import { Component, Input } from '@angular/core';
import { Article } from '../../../core/interfaces/article';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { KeywordsPipe } from '../../pipes/keywords.pipe';

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [TruncatePipe, RouterModule, RouterLink, DatePipe, KeywordsPipe],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss'
})
export class ThumbnailComponent {

  @Input()
  article: Article;

  @Input()
  keywords: string;
}
