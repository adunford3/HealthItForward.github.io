import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreNavbarComponent} from './pre-navbar.component';

describe('PreNavbarComponent', () => {
    let component: PreNavbarComponent;
    let fixture: ComponentFixture<PreNavbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PreNavbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
