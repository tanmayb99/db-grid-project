import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        HttpClientModule
      ]
    }).compileComponents();
  });

  it(`should give proper sum based on rows selected`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.getRowSum([{"Number1":1},{"Number1":2}])
    expect(app.sum).toEqual(3);
  }));

});
