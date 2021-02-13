import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoModalPage } from './todo-modal.page';

describe('TodoModalPage', () => {
  let component: TodoModalPage;
  let fixture: ComponentFixture<TodoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
