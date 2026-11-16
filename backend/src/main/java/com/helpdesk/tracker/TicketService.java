package com.helpdesk.tracker;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public List<Ticket> findAll(Status status) {
        return status == null ? repository.findAll() : repository.findByStatus(status);
    }

    public Ticket findById(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket " + id + " not found"));
    }

    public Ticket create(Ticket ticket) {
        return repository.save(ticket);
    }

    public Ticket update(Long id, Ticket updated) {
        Ticket existing = findById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());
        existing.setPriority(updated.getPriority());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.delete(findById(id));
    }
}