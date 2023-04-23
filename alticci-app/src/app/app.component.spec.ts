import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlticciService } from './services/alticci.service';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let alticciService: AlticciService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [AlticciService],
    }).compileComponents();

    alticciService = TestBed.inject(AlticciService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the result on form submit', () => {
    const response = 123;
    spyOn(alticciService, 'getAlticci').and.returnValue(of(response));
    component.n = 5;
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.result).toEqual(response);
  });

  it('should display an error message when the service fails', () => {
    const errorMessage = 'service error';
    spyOn(alticciService, 'getAlticci').and.returnValue(
      throwError({ error: errorMessage })
    );
    component.n = 5;
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorElement.textContent.trim()).toEqual(errorMessage);
  });
});
