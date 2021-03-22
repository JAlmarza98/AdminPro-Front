import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels2: string[] = ['January', 'February', 'March'];
  public labels3: string[] = ['2006', '2007', '2008', ];
  public labels4: string[] = ['Eating', 'Drinking', 'Sleeping', ];

  public data1 = [[350, 450, 100]];
  public data2 = [[65, 59, 80]];
  public data3 = [[65, 59, 80]];
  public data4 = [[28, 48, 400]];

}
