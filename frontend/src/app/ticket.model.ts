export type Status = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export interface Ticket {
 id: number;
 title: string;
 description: string;
 status: Status;
 priority: Priority;
 createdAt: string;
}
export interface NewTicket {
 title: string;
 description: string;
 priority: Priority;
}
