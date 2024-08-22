//recursos prontos que impeçam a reinvenção de roda.
import express from 'express';
import { resolve } from 'path';
import  session  from 'express-session';

const host = '0.0.0.0'; //todas interfaces de rede disponiveis
const porta = 3000; 
const app = express();
const caminhoPublico = resolve('publico');

app.use(express.static(caminhoPublico));
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
    secret: 'segredo', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

function autenticar(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.status(401).send('Acesso Negado');
    }
}

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(`${caminhoPublico}/index.html`);
});

// Página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

// Autenticação do usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'usuario' && password === '123') {
        req.session.authenticated = true;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// Página de evento
app.get('/evento/:nome', autenticar, (req, res) => {
    const nomePagina = req.params.nome;
    const caminhoArquivo = `${caminhoPublico}/${nomePagina}.html`;

    res.sendFile(caminhoArquivo, (err) => {
        if (err) {
            // Caso o arquivo não seja encontrado, retornar um erro 404
            res.status(404).send('Página não encontrada');
        }
    });
});

//listen = executar por requisições dos usuários
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});