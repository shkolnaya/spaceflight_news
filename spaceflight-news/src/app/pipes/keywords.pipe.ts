import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keywords',
  standalone: true
})
export class KeywordsPipe implements PipeTransform {

  transform(text: string, search: string): string {

    const keywordsArray = search.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);

    if (keywordsArray.length === 0) return text;

    const regex = new RegExp(`(${keywordsArray.join('|')})`, 'gi');

    return text.replace(regex, '<span class="highlight">$1</span>');

  }
}