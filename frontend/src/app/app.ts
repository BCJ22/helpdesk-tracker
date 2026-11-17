import { Component } from '@angular/core';
import { TicketList } from './ticket-list/ticket-list';
@Component({
 imports: [TicketList],
 selector: 'app-root',
 styleUrl: './app.css',
 templateUrl: './app.html',
})
export class App {
 protected readonly title = 'IT Help Desk Tracker';
}
