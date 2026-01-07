// Client Database Manager
class ClientDatabase {
    constructor() {
        this.clients = this.loadClients();
        this.editingId = null;
        this.init();
    }

    init() {
        this.renderClients();
        this.attachEventListeners();
        this.updateStats();
    }

    attachEventListeners() {
        // Form submission
        document.getElementById('clientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchClients(e.target.value);
        });

        document.getElementById('searchBtn').addEventListener('click', () => {
            const searchTerm = document.getElementById('searchInput').value;
            this.searchClients(searchTerm);
        });

        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.cancelEdit();
        });
    }

    loadClients() {
        const stored = localStorage.getItem('photographerClients');
        return stored ? JSON.parse(stored) : [];
    }

    saveClients() {
        localStorage.setItem('photographerClients', JSON.stringify(this.clients));
        this.updateStats();
    }

    handleFormSubmit() {
        let createdAt;
        if (this.editingId) {
            const existingClient = this.clients.find(c => c.id === this.editingId);
            createdAt = existingClient ? existingClient.createdAt : new Date().toISOString();
        } else {
            createdAt = new Date().toISOString();
        }

        const client = {
            id: this.editingId || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: document.getElementById('clientName').value.trim(),
            email: document.getElementById('clientEmail').value.trim(),
            phone: document.getElementById('clientPhone').value.trim(),
            date: document.getElementById('clientDate').value,
            type: document.getElementById('clientType').value,
            status: document.getElementById('clientStatus').value,
            notes: document.getElementById('clientNotes').value.trim(),
            createdAt: createdAt,
            updatedAt: new Date().toISOString()
        };

        if (this.editingId) {
            // Update existing client
            const index = this.clients.findIndex(c => c.id === this.editingId);
            this.clients[index] = client;
            this.editingId = null;
        } else {
            // Add new client
            this.clients.unshift(client);
        }

        this.saveClients();
        this.renderClients();
        this.resetForm();
    }

    resetForm() {
        document.getElementById('clientForm').reset();
        document.getElementById('formTitle').textContent = 'Add New Client';
        document.getElementById('submitBtn').textContent = 'Add Client';
        document.getElementById('cancelBtn').style.display = 'none';
        this.editingId = null;
    }

    cancelEdit() {
        this.resetForm();
    }

    editClient(id) {
        const client = this.clients.find(c => c.id === id);
        if (!client) return;

        this.editingId = id;
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientEmail').value = client.email;
        document.getElementById('clientPhone').value = client.phone || '';
        document.getElementById('clientDate').value = client.date || '';
        document.getElementById('clientType').value = client.type;
        document.getElementById('clientStatus').value = client.status;
        document.getElementById('clientNotes').value = client.notes || '';

        document.getElementById('formTitle').textContent = 'Edit Client';
        document.getElementById('submitBtn').textContent = 'Update Client';
        document.getElementById('cancelBtn').style.display = 'inline-block';

        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }

    deleteClient(id) {
        if (!confirm('Are you sure you want to delete this client?')) return;

        this.clients = this.clients.filter(c => c.id !== id);
        this.saveClients();
        this.renderClients();
    }

    searchClients(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (!term) {
            this.renderClients();
            return;
        }

        const filtered = this.clients.filter(client => {
            return client.name.toLowerCase().includes(term) ||
                   client.email.toLowerCase().includes(term) ||
                   (client.phone && client.phone.toLowerCase().includes(term)) ||
                   client.type.toLowerCase().includes(term) ||
                   client.status.toLowerCase().includes(term);
        });

        this.renderClients(filtered);
    }

    renderClients(clientsToRender = this.clients) {
        const container = document.getElementById('clientsList');
        const emptyState = document.getElementById('emptyState');

        if (clientsToRender.length === 0) {
            container.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        container.innerHTML = clientsToRender.map(client => this.createClientCard(client)).join('');

        // Attach event listeners to buttons
        clientsToRender.forEach(client => {
            document.getElementById(`edit-${client.id}`).addEventListener('click', () => {
                this.editClient(client.id);
            });
            document.getElementById(`delete-${client.id}`).addEventListener('click', () => {
                this.deleteClient(client.id);
            });
        });
    }

    createClientCard(client) {
        const sessionDate = client.date ? new Date(client.date).toLocaleDateString() : 'Not scheduled';
        const typeLabel = client.type.charAt(0).toUpperCase() + client.type.slice(1);
        
        return `
            <div class="client-card">
                <div class="client-header">
                    <div class="client-info">
                        <h3>${this.escapeHtml(client.name)}</h3>
                        <div class="client-contact">
                            <span>📧 ${this.escapeHtml(client.email)}</span>
                            ${client.phone ? `<span>📱 ${this.escapeHtml(client.phone)}</span>` : ''}
                        </div>
                    </div>
                    <div class="client-actions">
                        <button id="edit-${client.id}" class="btn btn-small btn-secondary">Edit</button>
                        <button id="delete-${client.id}" class="btn btn-small btn-danger">Delete</button>
                    </div>
                </div>
                <div class="client-details">
                    <div class="detail-item">
                        <span class="detail-label">Session Type</span>
                        <span class="detail-value">${typeLabel}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Session Date</span>
                        <span class="detail-value">${sessionDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="status-badge status-${client.status}">${client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
                    </div>
                </div>
                ${client.notes ? `<div class="client-notes">📝 ${this.escapeHtml(client.notes)}</div>` : ''}
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStats() {
        const count = this.clients.length;
        document.getElementById('clientCount').textContent = `${count} ${count === 1 ? 'client' : 'clients'}`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ClientDatabase();
});
