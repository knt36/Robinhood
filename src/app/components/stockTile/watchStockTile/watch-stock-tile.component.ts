/**
 * Created by anhle on 8/5/17.
 */

import {Component, Input, OnInit, OnDestroy, OnChanges, Output, EventEmitter} from "@angular/core";
import Stock = StockModule.Stock;
import {DecimalPipe} from "@angular/common";
import {RobinhoodService} from "../../../services/RobinhoodService";
import {StockModule} from "../../../model/Stock.model";
import {Constant} from "../../../model/constant";
import StockType = StockModule.StockType;
import {StockTileComponent} from "../stock-tile.component";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'watch-stock-tile',
  templateUrl : '../stock-tile.component.html',
  styleUrls: ['../stock-tile.component.scss']
})


export class WatchStockTileComponent extends StockTileComponent implements OnInit {

  constructor(public notification:NotificationsService,   public decimalPipe: DecimalPipe,public rb:RobinhoodService) {
    super(notification, decimalPipe, rb);
  }

  public display={
    symbol:"loading",
    price: "loading",
    priceClass:"",
    dailyPercentChange:"loading",
    dailyPercentChangeClass:"",
    text1:{
      title: "Missed Profit",
      info:"",
      class:""
    },
    text2:{
      title: "Sold Price % Diff",
      info:"",
      class:""
    },
    text3:{
      title: "Shares Sold",
      info:"",
      class:""
    },
    text4:{
      title: "Sold Price",
      info:"",
      class:""
    },
    leftButton:{
      label:"Unwatch"
    },
    rightButton:{
      label:"Buy"
    }
  }

  setDisplay(){
    const lastOrder = this.stock!=null ? this.stock.getLastSoldOrder(): null;
    const missedProfit = this.stock!= null && lastOrder!= null?
      this.decimalPipe.transform((Number.parseFloat(this.stock.instrument.quote.last_trade_price)
        * Number.parseInt(lastOrder.cumulative_quantity))-
        (Number.parseFloat(lastOrder.average_price) * Number.parseInt(lastOrder.cumulative_quantity))
        , '1.2')
       : null;

    const soldPricePercentDiff = this.stock!=null && lastOrder!=null?
      this.decimalPipe.transform(((Number.parseFloat(this.stock.instrument.quote.last_trade_price)
        - (Number.parseFloat(lastOrder.average_price)))/
        Number.parseFloat(lastOrder.average_price)) * 100,'1.2')
      : null;

    this.display.symbol = this.stock!= null? this.stock.instrument.symbol: "loading";
    this.display.price = this.stock!= null?
      this.decimalPipe.transform(this.stock.instrument.quote.last_trade_price, '1.2'): "loading";
    this.display.dailyPercentChange = this.stock!= null? this.stock.display.percent_change: "loading";
    this.display.dailyPercentChangeClass = this.stock!= null? this.stock.display.stock_gain: "loading";

    this.display.text1.info = missedProfit!=null? "$" + missedProfit: "none";
    this.display.text1.class = missedProfit!=null?(Number.parseFloat(missedProfit)<0?Constant.COLOR.GAIN:Constant.COLOR.LOSS):null;

    this.display.text2.info = soldPricePercentDiff != null? "%" + soldPricePercentDiff: "none";
    this.display.text3.info = lastOrder != null? parseInt(lastOrder.cumulative_quantity,10) + "": "none";
    this.display.text4.info = lastOrder != null?
      "$"+this.decimalPipe.transform(lastOrder.average_price, '1.2'): "none";
  }

  /**
   * Left Button is a Unwatch Button
   */
  leftButton(){
    this.rb.removeStockFromWatchList(this.stock.instrument)
  }
}
