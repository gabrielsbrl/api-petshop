const ModeloFornecedor = require('./ModeloTabelaFornecedor');

module.exports = {
    listar() {
        return ModeloFornecedor.findAll();
    },
    inserir(fornecedor) {
        return ModeloFornecedor.create(fornecedor);
    },
    async pegarPorId(id) {
        const encontrado = await ModeloFornecedor.findOne({
            where: {
                id
            }
        });

        if(!encontrado) {
            throw new Error('Fornecedor não encontrado!');
        }
        return encontrado;
    },
    async atualizar(id, dadosParaAtualizar) {
        return ModeloFornecedor.update(
            dadosParaAtualizar,
            {
                where: { id }
            }
        );
    },
    remover(id) {
        return ModeloFornecedor.destroy({
            where: { id }
        });
    }
};