import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('appTopWidget') appTopWidget!: ElementRef;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'Card 1',
            cols: 1,
            rows: 1,
            widget: ' this.appTopWidget.nativeElement',
          },
          {
            title: 'Card 2',
            cols: 1,
            rows: 1,
            widget: '<app-top-widget> </app-top-widget>',
          },
          {
            title: 'Card 3',
            cols: 1,
            rows: 1,
            widget: '<app-top-widget> </app-top-widget>',
          },
          {
            title: 'Card 4',
            cols: 1,
            rows: 1,
            widget: '<app-top-widget> </app-top-widget>',
          },
        ];
      }

      return [
        {
          title: 'Card 1',
          cols: 2,
          rows: 1,
          widget: ' this.appTopWidget.nativeElement',
        },
        {
          title: 'Card 2',
          cols: 1,
          rows: 1,
          widget: '<app-top-widget> </app-top-widget>',
        },
        {
          title: 'Card 3',
          cols: 1,
          rows: 2,
          widget: '<app-top-widget> </app-top-widget>',
        },
        {
          title: 'Card 4',
          cols: 1,
          rows: 1,
          widget: '<app-top-widget> </app-top-widget>',
        },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
 
  }
}
