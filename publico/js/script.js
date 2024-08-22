function calcularTotal() {
    let quantidade = parseInt(document.getElementById('quantidade').value, 10);
    let preco = parseFloat(document.getElementById('preco').textContent.replace(',', '.'));
  
    let valorTotal = quantidade * preco;
    document.getElementById('valorTotal').textContent = `R$ ${valorTotal.toFixed(2)}`.replace('.',',');
}

document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            document.getElementById('error-message').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('error-message').style.display = 'block';
    });
});
