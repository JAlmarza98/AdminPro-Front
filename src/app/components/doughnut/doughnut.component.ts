import { Component, Input } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

  @Input() title: string = 'No Title';
  @Input() labels: string[] = [];
  @Input() data: number[][] = [];

  public colors: Color[] =[
    { backgroundColor: ['#6857E6', '#009FEE','#F02059']}
  ]

}
