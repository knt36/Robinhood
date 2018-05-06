import { Component, OnInit } from '@angular/core';
import {StockTileComponent} from "../stock-tile.component";
import {DecimalPipe} from "@angular/common";
import {NotificationsService} from "angular2-notifications/dist";
import {RobinhoodService} from "../../../services/RobinhoodService";

@Component({
  selector: 'app-position-stock-tile',
  templateUrl: '../stock-tile.component.html',
  styleUrls: ['../stock-tile.component.scss']
})
export class PositionStockTileComponent extends StockTileComponent implements OnInit {

  constructor(public notification:NotificationsService,   public decimalPipe: DecimalPipe,public rb:RobinhoodService) {
    super(notification, decimalPipe, rb);
  }
}
