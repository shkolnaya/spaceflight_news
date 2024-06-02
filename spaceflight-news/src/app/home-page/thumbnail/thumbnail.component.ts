import { Component, Input } from '@angular/core';
import { Article } from '../../../core/interfaces/article';
import { TruncatePipe } from '../../truncate.pipe';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [TruncatePipe, RouterModule, RouterLink],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss'
})
export class ThumbnailComponent {

  @Input()
  article: Article;
}
