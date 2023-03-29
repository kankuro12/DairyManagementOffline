import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MilkfatsnfPage } from './milkfatsnf.page';

describe('MilkfatsnfPage', () => {
  let component: MilkfatsnfPage;
  let fixture: ComponentFixture<MilkfatsnfPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkfatsnfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MilkfatsnfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
