const TabelaFornecedor = require('./TabelaFornecedor');

class Fornecedor {
    
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataAtualizacao = dataAtualizacao;
        this.dataCriacao = dataCriacao;
        this.versao = versao;
    }

    async criar() {
        
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria,
        });

        this.id = resultado.id;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.dataCriacao = resultado.dataCriacao;
        this.versao = resultado.versao;
    }
    
    async carregar() {
        const fornecedorEncontrado = await TabelaFornecedor.pegarPorId(this.id);
        this.empresa = fornecedorEncontrado.empresa;
        this.email = fornecedorEncontrado.email;
        this.categoria = fornecedorEncontrado.categoria;
        this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao;
        this.dataCriacao = fornecedorEncontrado.dataCriacao;
        this.versao = fornecedorEncontrado.versao;
    }

    async atualizar() {
        await TabelaFornecedor.pegarPorId(this.id);
        const campos = ['empresa', 'email', 'categoria'];
        const dadosParaAtualizar = {};
        campos.forEach(c => {
            const valor = this[c];
            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[c] = valor;
            }
        });
        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Dados não fornecidos para atualização de fornecedor!');
        }
        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
    }
}

module.exports = Fornecedor;