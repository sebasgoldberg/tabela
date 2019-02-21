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

    isTabelaPrincipal: function(sTipoNegociacao) {
        return ( sTipoNegociacao === 'B' );
    },

    isNegociacoesGeradasVisible: function(sTipoNegociacao, sStatus) {
        // Exibição das negociações geradas só para a tabela principal,
        // uma vez que foi concluida.
        return ( sTipoNegociacao === 'B' && ( sStatus === 'N' || sStatus === 'F' ));
    },

    isTabelaPrincipalConcluida: function(sTipoNegociacao, sStatus) {
        // Não será exibida a seção de variação de custo no casso que
        // a negociação seja a principal e ainda não fosse concluida.
        return ( sTipoNegociacao === 'A' || ( sStatus === 'N' || sStatus === 'F' ));
    },

    isAprovacaoItemVisible: function(iPai) {
        return ( iPai === 0 );
    },

    isAprovacaoEnabled: function(sTipoNegociacao, sStatus) {
        let bc = this.getView().getBindingContext()
        if (!bc)
            return false;
        let oNegociacao = bc.getObject();
        return ( oNegociacao.TipoNegociacao === 'A' );
    },

    formatDescricaoItemOrg: function(sNegociacaoID, sTipoAbrangencia){
        return 'UF';
    },

    textoSecaoCustosItens: function(sStatus) {
        if ( !sStatus || sStatus === 'T' )
            return "Itens"
        return "Comparativo UF"
    },

});

