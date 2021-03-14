const ModeloFornecedor = require('./ModeloTabelaFornecedor');

module.exports = {
    
    listar() {
        return ModeloFornecedor.findAll();
    }

};