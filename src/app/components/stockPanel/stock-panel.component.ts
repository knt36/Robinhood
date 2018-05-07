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

  public display ={
    title : {
      value: 'loading...',
      description: NaN,
      descriptionColor: 'black'
    },
    subTitle: {
      value1: 'loading',
      value2: 'loading',
      value3: 'loading'
    }
  }

  constructor(public notification:NotificationsService, public rb:RobinhoodService){
  }

  ngOnChanges(){
    this.setDisplay();
    this.rb.getFundamentals(this.stock.instrument.symbol).then( res=> {
      console.log(res);
    })
  }

  setDisplay(){
    this.display.title.value = this.stock.display.symbol;
    this.display.title.description = this.stock.display.price;
    this.display.subTitle.value1 = this.stock.display.percent_change;
    this.display.title.descriptionColor = this.stock.display.stock_gain;
  }

  setDisplayFundamentals(){

  }

  closePanel(){
    this.panelEvent.emit('closePanel');
    console.log("close stock panel");
  }
}
