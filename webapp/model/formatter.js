import formatter from 'simplifique/telaneg/custos/model/formatter';
import ValueState from "sap/ui/core/ValueState";


export default Object.assign({}, formatter, {

    botaoNovoLabel: function(sTipoNegociacao){
        return "Nova Tabela";
    },

    apuracaoAteLabel: function(){
        return "Vigência Tabela";
    },

    variacaoPMZStatus: function(variacaoPMZ, PMZAtual, PMZSimulado) {
        if (PMZAtual && PMZSimulado){
            if (variacaoPMZ >= 0)
                return ValueState.Success;
            return ValueState.Error;
        }
        return ValueState.None;
    },

});

