/**
 * Created by anhle on 8/7/17.
 */
import {Component, Input, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, OnChanges} from '@angular/core';
import {GraphData} from "../../model/Historical.model";
import {Constant} from "../../model/constant";
import {RobinhoodService} from "../../services/RobinhoodService";
import {BaseChartDirective} from "ng2-charts";


declare var google:any;

@Component({
    selector: 'line-chart',
    templateUrl: './chart.component.html',
})

export class ChartComponent implements OnInit, OnDestroy, OnChanges{
  @Input('pointSize') pointSize: number;
  @Input('isGaining') isGaining: boolean;
  @Input('span') span = 'day';
  @ViewChild(BaseChartDirective) chartElement: BaseChartDirective;
  public gainingColor = 'rgb(0,255,0,1)';
  public losingColor = 'rgb(255,0,0, 1)';
  public neutral = 'rgb(2, 237, 119,1)';
  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Stock'}
  ];
  public lineChartOptions:any = {
    legend:{
      display:false
    },
    scales:
      {
        xAxes: [{
          display: false,

        }],
        yAxes:[{
          display:false
        }]
      },
    elements:
      {
        point:
          {
            display:false,
            radius: 0,
            hitRadius: 10,
            hoverRadius: 2,
            backgroundColor: 'black',
            hoverBorderWidth: 2
          }
      },
    responsive: true,
    animation:false,
    maintainAspectRatio: false
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'white',
      borderColor: this.neutral,
      pointBackgroundColor: 'yellow',
      borderWidth: 1
    }
  ];

  public lineChartLabels:Array<any> = [];

  public lineChartLegend:boolean = true;
  public lineChartType:string = "line";

    public graphOptions:any = {
        interval: Constant.Graph.INTERVAL.FIVE_M,
        span: Constant.Graph.SPAN.DAY,
        bound: Constant.Graph.BOUND.REGULAR
    };
    private getGraphInterval:any;

    // change this variable as later we allow users to choose their own settings
    private graphInterval:number = (5*60*1000) +  Math.random() % (1*60*1000);

    @Input('symbol') symbol:string;

    constructor(public rb:RobinhoodService, public c: ChangeDetectorRef){

    }

    ngOnInit() {
        this.lineChartOptions.elements.point.radius = this.pointSize != null ? this.pointSize : 0;
        this.updateGraph();
        this.getGraphInterval = setInterval(() => {
            this.updateGraph();
        }, this.graphInterval);
    }

    ngOnDestroy(){
        clearInterval(this.getGraphInterval);
    }

    ngOnChanges(){
      clearInterval(this.getGraphInterval);
      this.updateGraph();
      this.getGraphInterval = setInterval(() => {
        this.updateGraph();
      }, this.graphInterval);
    }


    createLineChart(element:any):any {
        return new google.visualization.LineChart(element);
    }

    createDataTable(array:any[]):any {
        return google.visualization.arrayToDataTable(array);
    }


    updateGraph(){
        const newLineChartData = [];
        const labels = [];
        newLineChartData.push({
          data: [],
          label: "price"
        });
        this.rb.getHistoricalsData(this.symbol, this.span).then( x => {
          x.data.forEach(item=>{
            newLineChartData[0].data.push(item);
            labels.push(item);
          })
          this.lineChartData = newLineChartData;
          this.chartElement.chart.config.data.labels = labels;
        });
    }
}
