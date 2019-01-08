import formatter from 'simplifique/telaneg/custos/model/formatter';

export default Object.assign({}, formatter, {

    botaoNovoLabel: function(sTipoNegociacao){
        return "Nova Tabela";
    },

    apuracaoAteLabel: function(){
        return "Vigência Tabela";
    },
});

