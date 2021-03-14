const router = require('express').Router();

const Fornecedor = require('./Fornecedor');
const TabelaFornecedor = require('./TabelaFornecedor');

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.send(JSON.stringify(resultados));
});

router.get('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id });
        await fornecedor.carregar(id);
        res.send(JSON.stringify(fornecedor));
    } catch(ex) {
        res.send(JSON.stringify({
            mensagem: ex.message
        }));
    }
});

router.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    res.send(JSON.stringify(fornecedor));
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

module.exports = router;