import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/api/Values').subscribe(
      response => {
        this.values = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
