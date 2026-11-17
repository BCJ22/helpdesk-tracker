import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketApi } from '../ticket-api';
import { Priority, Status, Ticket } from '../ticket.model';
@Component({
 imports: [FormsModule, DatePipe],
 selector: 'app-ticket-list',
 styleUrl: './ticket-list.css',
 templateUrl: './ticket-list.html',
})
export class TicketList implements OnInit {
 private readonly api = inject(TicketApi);
 protected readonly statuses: Status[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
 protected readonly priorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
 protected readonly tickets = signal<Ticket[]>([]);
 protected readonly filter = signal<Status | ''>('');
 protected readonly error = signal('');
 protected readonly title = signal('');
 protected readonly description = signal('');
 protected readonly priority = signal<Priority>('MEDIUM');
 ngOnInit(): void {
 this.load();
 }
 protected load(): void {
 const status = this.filter() || undefined;
 this.api.list(status).subscribe({
 next: (tickets) => {
 this.tickets.set(tickets);
 this.error.set('');
 },
 error: () =>
 this.error.set('Could not load tickets. Is the Spring Boot app running on port 8080?'),
 });
 }
 protected setFilter(value: Status | ''): void {
 this.filter.set(value);
 this.load();
 }
 protected add(): void {
 const title = this.title().trim();
 if (!title) {
 return;
 }
 this.api
 .create({ title, description: this.description().trim(), priority: this.priority() })
 .subscribe({
 next: () => {
 this.title.set('');
 this.description.set('');
 this.priority.set('MEDIUM');
 this.load();
 },
 error: () => this.error.set('Could not create the ticket.'),
 });
 }
 protected changeStatus(ticket: Ticket, status: Status): void {
 this.api.update({ ...ticket, status }).subscribe({
 next: () => this.load(),
 error: () => this.error.set('Could not update the ticket.'),
 });
 }
 protected remove(ticket: Ticket): void {
 this.api.delete(ticket.id).subscribe({
 next: () => this.load(),
 error: () => this.error.set('Could not delete the ticket.'),
 });
 }
}
