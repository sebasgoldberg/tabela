import formatter from 'simplifique/telaneg/tabela/model/formatter';
import Controller from "simplifique/telaneg/custos/controller/TaskList.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import Filter from 'sap/ui/model/Filter';
import FilterOperator from 'sap/ui/model/FilterOperator';

export default Controller.extend("simplifique.telaneg.tabela.controller.TaskList", {

    formatter: formatter,

    onInit: function(...args) {
        Controller.prototype.onInit.apply(this, ...args);

        let v = this.getView();
        v.setModel(new JSONModel({
            filter: {
                dataEnvioDe: null,
                dataEnvioAte: null,
            },
        }), 'tabelaView');

    },

    filtrarPorUsuario: function() {
        let v = this.getView();
        let oTipoNegociacao = v.getBindingContext().getObject();
        // Em caso de ser a tabela de analises.
        if (oTipoNegociacao.ID === 'A')
            // É eliminada a inicialização do filtro de usuario.
            return;
        Controller.prototype.filtrarPorUsuario.apply(this);
    },

    clearDataEnvioDateRangeSelection: function(oEvent) {
        this.clearFilterDateRangeSelection(
            this.getView().byId('dataEnvioDateRangeSelection'));
    },

    _createFilters: function() {
        let aFilters = Controller.prototype._createFilters.apply(this);

        let v = this.getView();
        let m = v.getModel('tabelaView');
        let filter = m.getData().filter;

        if (filter.dataEnvioDe)
            aFilters.push(new Filter('Vencimento', FilterOperator.BT, filter.dataEnvioDe, filter.dataEnvioAte));

        let oTipoNegociacao = v.getBindingContext().getObject();

        // Em caso de ser a tabela de analises aplicamos o filtro por Seção
        if (oTipoNegociacao.ID === 'A'){
            let oMultiInputSecao = v.byId('multiInputSecao');
            oMultiInputSecao.getTokens().map( oToken =>
                aFilters.push(new Filter('SubconjuntoPai', FilterOperator.EQ, oToken.getKey() )));
        }

        return aFilters;
    },

});

