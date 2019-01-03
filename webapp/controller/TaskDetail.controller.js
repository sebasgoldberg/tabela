import formatter from 'simplifique/telaneg/tabela/model/formatter';
import Controller from "simplifique/telaneg/custos/controller/TaskDetail.controller";

export default Controller.extend("simplifique.telaneg.tabela.controller.TaskDetail", {

    formatter: formatter,

    onInit: function(...args) {
        Controller.prototype.onInit.apply(this, ...args);
    },

});


