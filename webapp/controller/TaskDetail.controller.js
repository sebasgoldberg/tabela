import formatter from 'simplifique/telaneg/tabela/model/formatter';
import Controller from "simplifique/telaneg/custos/controller/TaskDetail.controller";

export default Controller.extend("simplifique.telaneg.tabela.controller.TaskDetail", {

    formatter: formatter,

    onInit: function(...args) {
        Controller.prototype.onInit.apply(this, ...args);
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

    onDeleteFornecedorAdicional: async function(oEvent) {
        let bEliminacaoRealizada = await Controller.prototype.onDeleteFornecedorAdicional.apply(this, oEvent);
        if (bEliminacaoRealizada)
            this.refreshItems();
    },

    onAddFornecedorAdicional: async function(oEvent) {
        let bAdicaoRealizada = await Controller.prototype.onAddFornecedorAdicional.apply(this, oEvent);
        if (bAdicaoRealizada)
            this.refreshItems();
    },

    refreshFornecedores: function() {
        this.getView()
            .byId('fornecedoresAdicionaisTable')
            .getBinding('items')
            .refresh();
    },

});


