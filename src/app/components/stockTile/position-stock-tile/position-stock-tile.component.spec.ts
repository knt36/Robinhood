import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionStockTileComponent } from './position-stock-tile.component';

describe('PositionStockTileComponent', () => {
  let component: PositionStockTileComponent;
  let fixture: ComponentFixture<PositionStockTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionStockTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionStockTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
