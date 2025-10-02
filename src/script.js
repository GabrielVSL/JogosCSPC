// Garante que o script só rode após o carregamento completo do HTML.
document.addEventListener('DOMContentLoaded', () => {
    
    // Pega o container principal onde todas as categorias e jogos serão inseridos.
    const mainContainer = document.getElementById('jogos-container');

    // Busca o arquivo JSON com todos os dados.
    fetch('jogos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro de rede ou arquivo jogos.json não encontrado');
            }
            return response.json();
        })
        .then(data => {
            // 'data' agora é um objeto com as séries como chaves (ex: "1º Ano", "2º Ano").

            // Itera sobre cada chave (cada série) no objeto de dados.
            for (const categoria in data) {
                
                // 1. Cria o título da categoria (ex: <h2>1º Ano</h2>).
                const tituloCategoria = document.createElement('h2');
                tituloCategoria.className = 'categoria-titulo'; // Adiciona uma classe para estilização
                tituloCategoria.textContent = categoria;
                mainContainer.appendChild(tituloCategoria);

                // 2. Cria um container específico para os jogos desta categoria.
                const jogosContainer = document.createElement('div');
                jogosContainer.className = 'link-container'; // Reutiliza a classe que já temos
                
                // Pega a lista de jogos para a categoria atual.
                const jogos = data[categoria];

                // 3. Itera sobre cada jogo dentro da lista da categoria.
                jogos.forEach(jogo => {
                    const card = document.createElement('a');
                    card.href = jogo.url;
                    card.className = 'link-card';
                    card.target = '_blank';

                    // VERSÃO CORRIGIDA: Cria um ícone <i> em vez de <img>
                    const icone = document.createElement('i');
                    // Usa a classe base "fi" e a classe do JSON (ex: "fi-ss-calculator")
                    icone.className = `fi ${jogo.iconClass}`; 

                    const nome = document.createElement('span');
                    nome.textContent = jogo.nome;

                    // Adiciona o ÍCONE e o nome ao card
                    card.appendChild(icone);
                    card.appendChild(nome);

                    // Adiciona o card ao container desta categoria.
                    jogosContainer.appendChild(card);
                });

                // 4. Adiciona o container de jogos da categoria ao container principal.
                mainContainer.appendChild(jogosContainer);
            }
        })
        .catch(error => {
            console.error('Houve um erro ao carregar os jogos:', error);
            mainContainer.innerHTML = '<p>Não foi possível carregar a lista de jogos no momento.</p>';
        });
});