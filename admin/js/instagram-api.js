/**
 * Instagram Graph API Integration
 * Documentação: https://developers.facebook.com/docs/instagram-api
 */

class InstagramAPI {
    constructor() {
        // IMPORTANTE: Estes valores devem ser configurados com suas próprias credenciais
        // Obtenha em: https://developers.facebook.com/apps/
        this.APP_ID = '1330625782180698'; // App ID do aura_midia_eduardo
        this.APP_SECRET = '5629bb2ef8306f33ac65e16c6fc9c147'; // Chave Secreta do Aplicativo
        this.REDIRECT_URI = window.location.origin + '/admin/instagram-callback.html';
        this.API_VERSION = 'v18.0';
        this.BASE_URL = `https://graph.instagram.com/${this.API_VERSION}`;
        this.GRAPH_URL = `https://graph.facebook.com/${this.API_VERSION}`;
    }

    /**
     * Inicia o fluxo de autenticação OAuth do Instagram
     */
    startOAuth(clientId) {
        // Salvar ID do cliente para usar após o callback
        sessionStorage.setItem('connecting_client_id', clientId);

        // Scopes necessários para a API do Instagram
        const scopes = [
            'instagram_basic',
            'instagram_content_publish',
            'pages_show_list',
            'pages_read_engagement'
        ].join(',');

        // URL de autorização do Facebook
        const authUrl = `https://www.facebook.com/${this.API_VERSION}/dialog/oauth?` +
            `client_id=${this.APP_ID}` +
            `&redirect_uri=${encodeURIComponent(this.REDIRECT_URI)}` +
            `&scope=${scopes}` +
            `&response_type=code`;

        // Abrir popup de autenticação
        const width = 600;
        const height = 700;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        window.open(
            authUrl,
            'Instagram OAuth',
            `width=${width},height=${height},left=${left},top=${top}`
        );
    }

    /**
     * Troca o código de autorização por um access token
     */
    async exchangeCodeForToken(code) {
        try {
            // Em produção, esta chamada DEVE ser feita no backend para proteger o APP_SECRET
            const response = await fetch(`${this.GRAPH_URL}/oauth/access_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: this.APP_ID,
                    client_secret: this.APP_SECRET,
                    code: code,
                    redirect_uri: this.REDIRECT_URI
                })
            });

            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error('Erro ao trocar código por token:', error);
            throw error;
        }
    }

    /**
     * Obtém o Instagram Business Account ID vinculado à página do Facebook
     */
    async getInstagramAccountId(accessToken) {
        try {
            // Primeiro, pegar as páginas do Facebook
            const pagesResponse = await fetch(
                `${this.GRAPH_URL}/me/accounts?access_token=${accessToken}`
            );
            const pagesData = await pagesResponse.json();

            if (!pagesData.data || pagesData.data.length === 0) {
                throw new Error('Nenhuma página do Facebook encontrada');
            }

            // Pegar a primeira página (ou permitir que o usuário escolha)
            const pageId = pagesData.data[0].id;
            const pageToken = pagesData.data[0].access_token;

            // Pegar o Instagram Business Account vinculado
            const igResponse = await fetch(
                `${this.GRAPH_URL}/${pageId}?fields=instagram_business_account&access_token=${pageToken}`
            );
            const igData = await igResponse.json();

            return {
                instagram_id: igData.instagram_business_account.id,
                page_token: pageToken
            };
        } catch (error) {
            console.error('Erro ao obter Instagram Account ID:', error);
            throw error;
        }
    }

    /**
     * Obtém informações do perfil do Instagram
     */
    async getProfile(instagramId, accessToken) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/${instagramId}?fields=id,username,name,profile_picture_url,followers_count,follows_count,media_count&access_token=${accessToken}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao obter perfil:', error);
            throw error;
        }
    }

    /**
     * Obtém posts recentes do Instagram
     */
    async getMediaList(instagramId, accessToken, limit = 25) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/${instagramId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${accessToken}`
            );
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Erro ao obter lista de mídias:', error);
            throw error;
        }
    }

    /**
     * Obtém insights/estatísticas do perfil
     */
    async getInsights(instagramId, accessToken, metrics = ['impressions', 'reach', 'profile_views'], period = 'day') {
        try {
            const metricsStr = metrics.join(',');
            const response = await fetch(
                `${this.BASE_URL}/${instagramId}/insights?metric=${metricsStr}&period=${period}&access_token=${accessToken}`
            );
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Erro ao obter insights:', error);
            throw error;
        }
    }

    /**
     * Obtém insights de um post específico
     */
    async getMediaInsights(mediaId, accessToken) {
        try {
            const metrics = 'engagement,impressions,reach,saved';
            const response = await fetch(
                `${this.BASE_URL}/${mediaId}/insights?metric=${metrics}&access_token=${accessToken}`
            );
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Erro ao obter insights da mídia:', error);
            return [];
        }
    }

    /**
     * Cria um container de mídia (primeiro passo para publicar)
     */
    async createMediaContainer(instagramId, accessToken, imageUrl, caption) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/${instagramId}/media`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        image_url: imageUrl,
                        caption: caption,
                        access_token: accessToken
                    })
                }
            );
            const data = await response.json();
            return data.id;
        } catch (error) {
            console.error('Erro ao criar container de mídia:', error);
            throw error;
        }
    }

    /**
     * Publica o container de mídia criado
     */
    async publishMedia(instagramId, accessToken, creationId) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/${instagramId}/media_publish`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        creation_id: creationId,
                        access_token: accessToken
                    })
                }
            );
            const data = await response.json();
            return data.id;
        } catch (error) {
            console.error('Erro ao publicar mídia:', error);
            throw error;
        }
    }

    /**
     * Publica uma imagem no Instagram (processo completo)
     */
    async publishPost(instagramId, accessToken, imageUrl, caption) {
        try {
            // Passo 1: Criar container
            const containerId = await this.createMediaContainer(instagramId, accessToken, imageUrl, caption);
            
            // Aguardar alguns segundos para o Instagram processar a imagem
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Passo 2: Publicar
            const mediaId = await this.publishMedia(instagramId, accessToken, containerId);
            
            return mediaId;
        } catch (error) {
            console.error('Erro ao publicar post:', error);
            throw error;
        }
    }

    /**
     * Converte token de curta duração para longa duração (60 dias)
     */
    async getLongLivedToken(shortLivedToken) {
        try {
            const response = await fetch(
                `${this.GRAPH_URL}/oauth/access_token?` +
                `grant_type=fb_exchange_token&` +
                `client_id=${this.APP_ID}&` +
                `client_secret=${this.APP_SECRET}&` +
                `fb_exchange_token=${shortLivedToken}`
            );
            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error('Erro ao obter token de longa duração:', error);
            throw error;
        }
    }
}

// Instância global da API
const instagramAPI = new InstagramAPI();

// Funções auxiliares para usar nos componentes

/**
 * Inicia conexão com Instagram para um cliente
 */
function connectInstagram() {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');
    
    if (!clientId) {
        alert('ID do cliente não encontrado');
        return;
    }

    // Verificar se as credenciais da API estão configuradas
    if (instagramAPI.APP_ID === 'SEU_APP_ID_AQUI') {
        alert('⚠️ ATENÇÃO: Configure suas credenciais da API do Instagram!\n\n' +
              '1. Acesse: https://developers.facebook.com/apps/\n' +
              '2. Crie um app e obtenha o App ID e App Secret\n' +
              '3. Configure no arquivo: admin/js/instagram-api.js\n\n' +
              'Por enquanto, o sistema funcionará com dados simulados.');
        return;
    }

    instagramAPI.startOAuth(clientId);
}

/**
 * Atualiza dados do Instagram de um cliente
 */
async function refreshInstagramData(clientId) {
    const client = dataManager.getClient(clientId);
    
    if (!client || !client.access_token) {
        console.log('Cliente não conectado ao Instagram');
        return null;
    }

    try {
        // Obter dados do perfil
        const profile = await instagramAPI.getProfile(client.instagram_id, client.access_token);
        
        // Obter posts recentes
        const media = await instagramAPI.getMediaList(client.instagram_id, client.access_token);
        
        // Obter insights
        const insights = await instagramAPI.getInsights(client.instagram_id, client.access_token);
        
        return {
            profile,
            media,
            insights
        };
    } catch (error) {
        console.error('Erro ao atualizar dados do Instagram:', error);
        return null;
    }
}
