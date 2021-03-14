const ModeloTabela = require('../routes/fornecedores/ModeloTabelaFornecedor');

Promise.race([
    ModeloTabela.sync()
])
    .then(() => console.log('Tabela criada com sucesso!'))
    .catch(err => console.log('Não foi possível criar a tabela: ', err));
    