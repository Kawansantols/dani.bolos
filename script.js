document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('post-form');
    const postsList = document.getElementById('posts-list');
    
    // Função para carregar os posts do localStorage
    function loadPosts() {
        // Recupera os posts armazenados no localStorage, caso existam
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        
        // Limpa a lista de posts antes de exibir novamente
        postsList.innerHTML = '';

        // Adiciona cada post à lista na tela
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="deletePost(${index})">Excluir</button>
            `;
            postsList.appendChild(postElement);
        });
    }

    // Função para salvar o post no localStorage
    function savePost(title, content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    // Função para excluir um post
    window.deletePost = function(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.splice(index, 1); // Remove o post do array
        localStorage.setItem('posts', JSON.stringify(posts)); // Atualiza o localStorage
        loadPosts(); // Atualiza a tela com os posts restantes
    };

    // Quando o formulário for enviado, salva o post e limpa os campos
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        // Validação simples
        if (title && content) {
            savePost(title, content);
            postForm.reset(); // Limpa o formulário
        }
    });

    // Carrega os posts ao carregar a página
    loadPosts();
});
