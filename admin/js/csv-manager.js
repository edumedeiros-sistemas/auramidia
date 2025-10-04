/**
 * CSV Manager - Sistema de gerenciamento de dados via CSV
 * Gerencia leitura e escrita de arquivos CSV para clientes
 */

class CSVManager {
    constructor() {
        this.csvFile = '../data/clients.csv';
    }

    /**
     * Converte CSV para array de objetos
     */
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = this.parseCSVLine(lines[i]);
                const obj = {};
                headers.forEach((header, index) => {
                    const value = values[index] ? values[index].trim() : '';
                    // Converter ID para número se for o campo id
                    if (header.trim() === 'id') {
                        obj[header.trim()] = parseInt(value) || value;
                    } else {
                        obj[header.trim()] = value;
                    }
                });
                data.push(obj);
            }
        }

        console.log('CSV parseado:', data);
        return data;
    }

    /**
     * Converte array de objetos para CSV
     */
    arrayToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => this.escapeCSVValue(row[header] || '')).join(',')
            )
        ].join('\n');

        return csvContent;
    }

    /**
     * Escapa valores para CSV (trata vírgulas e aspas)
     */
    escapeCSVValue(value) {
        if (value === null || value === undefined) return '';
        
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
    }

    /**
     * Parse uma linha CSV considerando aspas
     */
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++; // Pula o próximo "
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current);
        return result;
    }

    /**
     * Carrega clientes do arquivo CSV
     */
    async loadClients() {
        try {
            const response = await fetch(this.csvFile);
            if (!response.ok) {
                throw new Error('Erro ao carregar arquivo CSV');
            }
            const csvText = await response.text();
            const clients = this.parseCSV(csvText);
            
            // Salvar no localStorage para cache
            localStorage.setItem('clients', JSON.stringify(clients));
            return clients;
        } catch (error) {
            console.error('Erro ao carregar clientes do CSV:', error);
            
            // Fallback: tentar carregar do localStorage
            const cachedClients = localStorage.getItem('clients');
            if (cachedClients) {
                console.log('Carregando clientes do cache...');
                return JSON.parse(cachedClients);
            }
            
            // Fallback: dados estáticos se não houver cache
            console.log('Usando dados estáticos...');
            return this.getStaticClients();
        }
    }

    /**
     * Dados estáticos de clientes (fallback)
     */
    getStaticClients() {
        return [
            {
                id: '1',
                name: 'Eduardo Medeiros',
                instagram: '@ensmedeiros',
                email: 'badcoto@gmail.com',
                phone: '(43) 98847-7636',
                plan: 'Profissional',
                status: 'Ativo',
                created_at: '2025-01-03T10:00:00.000Z',
                profile_picture: 'https://via.placeholder.com/70',
                instagram_id: '',
                access_token: '',
                facebook_page_id: '',
                instagram_business_id: '',
                api_configured: false,
                last_sync: ''
            },
            {
                id: '2',
                name: 'Kerowlen Sanches',
                instagram: '@kerowlensanches',
                email: 'kerowlen@email.com',
                phone: '(43) 99999-9999',
                plan: 'Básico',
                status: 'Ativo',
                created_at: '2025-01-03T10:00:00.000Z',
                profile_picture: 'https://via.placeholder.com/70',
                instagram_id: '',
                access_token: '',
                facebook_page_id: '',
                instagram_business_id: '',
                api_configured: false,
                last_sync: ''
            },
            {
                id: '3',
                name: 'Mercearia Padaria Popular',
                instagram: '@merceariapadaria_popular',
                email: 'mercearia@email.com',
                phone: '(43) 88888-8888',
                plan: 'Premium',
                status: 'Ativo',
                created_at: '2025-01-03T10:00:00.000Z',
                profile_picture: 'https://via.placeholder.com/70',
                instagram_id: '',
                access_token: '',
                facebook_page_id: '',
                instagram_business_id: '',
                api_configured: false,
                last_sync: ''
            }
        ];
    }

    /**
     * Salva clientes no arquivo CSV (simulado - em produção seria via backend)
     */
    async saveClients(clients) {
        try {
            const csvContent = this.arrayToCSV(clients);
            
            // Em um ambiente real, isso seria enviado para o backend
            // Por enquanto, vamos salvar no localStorage como backup
            localStorage.setItem('clients_backup', csvContent);
            
            // Simular upload para o servidor
            console.log('CSV atualizado:', csvContent);
            
            return true;
        } catch (error) {
            console.error('Erro ao salvar clientes:', error);
            return false;
        }
    }

    /**
     * Adiciona um novo cliente
     */
    async addClient(clientData) {
        const clients = await this.loadClients();
        
        // Gerar novo ID
        const maxId = clients.length > 0 ? Math.max(...clients.map(c => parseInt(c.id) || 0)) : 0;
        const newId = maxId + 1;
        
        const newClient = {
            id: newId.toString(),
            name: clientData.name,
            instagram: clientData.instagram.startsWith('@') ? clientData.instagram : '@' + clientData.instagram,
            email: clientData.email || '',
            phone: clientData.phone || '',
            plan: clientData.plan || 'Básico',
            status: 'Ativo',
            created_at: new Date().toISOString(),
            profile_picture: clientData.profile_picture || 'https://via.placeholder.com/70',
            instagram_id: '',
            access_token: ''
        };
        
        clients.push(newClient);
        
        const success = await this.saveClients(clients);
        if (success) {
            // Atualizar localStorage para uso imediato
            localStorage.setItem('clients', JSON.stringify(clients));
        }
        
        return success ? newClient : null;
    }

    /**
     * Atualiza um cliente existente
     */
    async updateClient(clientId, clientData) {
        const clients = await this.loadClients();
        const index = clients.findIndex(c => c.id === clientId);
        
        if (index === -1) return false;
        
        clients[index] = { ...clients[index], ...clientData };
        
        const success = await this.saveClients(clients);
        if (success) {
            localStorage.setItem('clients', JSON.stringify(clients));
        }
        
        return success;
    }

    /**
     * Remove um cliente
     */
    async deleteClient(clientId) {
        const clients = await this.loadClients();
        const filteredClients = clients.filter(c => c.id !== clientId);
        
        const success = await this.saveClients(filteredClients);
        if (success) {
            localStorage.setItem('clients', JSON.stringify(filteredClients));
        }
        
        return success;
    }

    /**
     * Busca cliente por ID
     */
    async getClient(clientId) {
        const clients = await this.loadClients();
        console.log('Buscando cliente ID:', clientId, 'em:', clients);
        
        // Converter clientId para número para comparação
        const id = parseInt(clientId);
        const client = clients.find(c => parseInt(c.id) === id);
        
        console.log('Cliente encontrado:', client);
        return client;
    }
}

// Instância global do CSV Manager
const csvManager = new CSVManager();
