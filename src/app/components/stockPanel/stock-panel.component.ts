/**
 * Created by anhle on 11/1/17.
 */

import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {StockModule} from "../../model/Stock.model";
import Stock = StockModule.Stock;
import {RobinhoodService} from "../../services/RobinhoodService";
import StockType = StockModule.StockType;
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'stock-panel',
  templateUrl : './stock-panel.component.html',
  styleUrls: ['./stock-panel.component.scss']
})


export class StockPanelComponent implements OnChanges
{

  @Input('stock') stock: Stock;
  @Output()
  panelEvent:EventEmitter<string> = new EventEmitter();
  selectedSpan = 'day';
  public display ={
    title : {
      value: 'loading...',
      description: NaN,
      descriptionColor: 'black'
    },
    subTitle: {
      value1: 'loading',
    },
    companyName: 'loading',
    dataItems:[],
    details: "loading"
  }

  constructor(public notification:NotificationsService, public rb:RobinhoodService){
  }

  ngOnChanges(){
    this.setDisplay();
    this.rb.getFundamentals(this.stock.instrument.symbol).then( res=> {
      this.clearDataItems();
      this.addDataItem('Average Volume', res.average_volume);
      this.addDataItem('CEO', res.ceo);
      this.addDataItem('Dividend Yield', res.dividend_yield !== '' && res.dividend_yield != null ? res.dividend_yield : 'NA');
      this.addDataItem('52-Week High', res.high_52_weeks);
      this.addDataItem('52-Week Low', res.low_52_weeks);
      this.addDataItem('Market Cap', res.market_cap);
      this.addDataItem('Num Employees', res.num_employees +'');
      this.addDataItem('PE Ratio', res.pe_ratio);
      this.addDataItem('Volume', res.volume);
      this.addDataItem('Open', res.open);
      this.addDataItem('Sector', res.sector);
      this.display.details = res.description;
    })
  }

  setDisplay(){
    this.display.companyName = this.stock.instrument.name;
    this.display.title.value = this.stock.display.symbol;
    this.display.title.description = this.stock.display.price;
    this.display.subTitle.value1 = this.stock.display.percent_change;
    this.display.title.descriptionColor = this.stock.display.stock_gain;
  }

  closePanel(){
    this.panelEvent.emit('closePanel');
    console.log("close stock panel");
  }

  addDataItem(label: string, detail: string){
    this.display.dataItems.push(new DataItem(label, detail));
  }

  clearDataItems(){
    this.display.dataItems = [];
  }

  setChartSpan(span){
    this.selectedSpan = span;
  }
}

class DataItem{
  public label: string;
  public detail: string;
  constructor(label: string, detail: string){
    this.label = label;
    this.detail = detail;
  }
}
