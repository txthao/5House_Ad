import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { timeout } from 'q';


@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.message = message;
            if (this.message && this.message.isTimeout) {
                setTimeout(() => this.removeMessage(), message.timeout);
            }
        });
    }

    removeMessage(){
        this.message = null;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}