import RemoteData from '../data/remote-data.js';
// import Utils from '../utils/utils';
import TemplateCreator from '../scripts/views/template-creator.js';

const Products = {
    async render() {
        return `      
            <h2 tabindex=0 class="page-title">Sayuran untuk Anda</h2>
            <div class="custom-divider"></div>
            <div id="vegetable-list-page">
                <div class="vegetable-list" id="vegetable-list-component">
                </div>
            </div>
        `;
    },

    async afterRender() {
        // const vegetableListPage = document.querySelector('#vegetable-list-page');
        // vegetableListPage.innerHTML += createLoadingIndicatorTemplate();

        const vegetableList = await RemoteData.getVegetables();

        // const loadingIndicator = vegetableListPage.querySelector('#loading-indicator-component');
        // Utils.hideElement(loadingIndicator);

        const vegetableListComponent = document.querySelector('#vegetable-list-component');
        vegetableList.forEach((vegetable) => {
            vegetableListComponent.innerHTML += TemplateCreator.createVegetableItemTemplate(vegetable);
        });
    },
};

export default Products;
