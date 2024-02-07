import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  @Input() prof_cours: any[] = [];
  @Input() prof_paiements: any[] = [];
  ngOnInit(): void {}
}
