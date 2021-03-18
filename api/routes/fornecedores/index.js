const router = require('express').Router();

const Fornecedor = require('./Fornecedor');
const TabelaFornecedor = require('./TabelaFornecedor');

router.get('/', async (req, res) => {
    try {
        const resultados = await TabelaFornecedor.listar();
        res.status(200).send(JSON.stringify(resultados));
    } catch(erro) {
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

router.get('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.carregar(id);
        res.status(200).send(JSON.stringify(fornecedor));
    } catch(ex) {
        res.status(500).send(JSON.stringify({
            mensagem: ex.message
        }));
    }
});

router.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        res.status(201).send(JSON.stringify(fornecedor));
    } catch(erro) {
        res.status(500).send(JSON.stringify({
            mensagem: erro.message
        }));
    }    
});

router.put('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor;
        const dadosRecebidos = req.body;
        const dados = Object.assign({}, dadosRecebidos, { id });
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        res.status(204).end();
    } catch(erro) {
        res.status(500).send(JSON.stringify({ message: erro.message }));
    }
});

router.delete('/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: idFornecedor });
        await fornecedor.carregar();
        await fornecedor.remover();
        res.status(204).end();
    }
    catch(erro) {
        res.status(500).send(JSON.stringify({ message: erro.message }));
    }
});

module.exports = router;