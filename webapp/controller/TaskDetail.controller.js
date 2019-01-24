import formatter from 'simplifique/telaneg/tabela/model/formatter';
import Controller from "simplifique/telaneg/custos/controller/TaskDetail.controller";
import JSONModel from "sap/ui/model/json/JSONModel";

export default Controller.extend("simplifique.telaneg.tabela.controller.TaskDetail", {

    formatter: formatter,

    onInit: function(...args) {
        Controller.prototype.onInit.apply(this, ...args);
        this.getView().setModel(new JSONModel({
            SemICMS: false,
        }), 'view_tab');
    },

    getNegociacaoSetExpandAttr: function() {
        return 'tipoNegociacao,fornecedor,status,bandeira,comentarioImpressao';
    },

    onMostrarAnexos: function(oEvent) {
        let sNegociacaoPath = this.getView().getBindingContext().getPath();
        let oTabelasImportadasDialog = this.getOwnerComponent().getTabelasImportadasDialog();
        oTabelasImportadasDialog.setCallerController(this);
        oTabelasImportadasDialog.open(sNegociacaoPath);
    },

    refreshVariacaoCusto: function() {
        this.getView().byId('variacaoCustoTreeTable').getBinding('rows').refresh();
    },

    onDeleteFornecedorAdicional: async function(oEvent) {
        let bEliminacaoRealizada = await Controller.prototype.onDeleteFornecedorAdicional.apply(this, oEvent);
        if (bEliminacaoRealizada){
            this.refreshItems();
            this.refreshVariacaoCusto();
        }
    },

    onAddFornecedorAdicional: async function(oEvent) {
        let bAdicaoRealizada = await Controller.prototype.onAddFornecedorAdicional.apply(this, oEvent);
        if (bAdicaoRealizada){
            this.refreshItems();
            this.refreshVariacaoCusto();
        }
    },

    refreshFornecedores: function() {
        this.getView()
            .byId('fornecedoresAdicionaisTable')
            .getBinding('items')
            .refresh();
    },

    onNavigateToNegociacaoFilha: function(oEvent) {
        let oListItem = oEvent.getParameter('listItem');
        let sNegociacaoID = oListItem.getBindingContext().getObject().ID;
        this.navTo('TaskDetail', {negociacaoID: sNegociacaoID});
    },

});


