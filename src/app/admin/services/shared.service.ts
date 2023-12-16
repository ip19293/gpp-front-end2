import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private filterValueSubject = new BehaviorSubject<string>('');
  filterValue$: Observable<string> = this.filterValueSubject.asObservable();

  setFilterValue(filterValue: string) {
    this.filterValueSubject.next(filterValue);
  }
}
