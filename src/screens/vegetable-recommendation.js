import RemoteData from '../data/remote-data.js';

const VegetableRecommendation = {
    async render() {
        return `
            <h2 tabindex=0 class="page-title">Cari rekomendasi sayur</h2>
            <div class="custom-divider"></div>
            <div class="recommendation-page">
                <div class="search-container">
                    <div class="autocomplete-container">
                        <label for="benefits"><h2>Masukkan manfaat sayur:</h2></label>
                        <input type="text" id="benefits" name="benefits" placeholder="Mulai ketik manfaat...">
                        <div id="benefits-list" class="autocomplete-items"></div>
                    </div>
                    <button id="search-button">Cari sayur!</button>
                </div>
            </div>
        `;
    },

    async afterRender() {
        const benefitsInput = document.querySelector('#benefits');
        const benefitsList = document.querySelector('#benefits-list');
        const searchButton = document.querySelector('#search-button');
        // const vegetableListContainer = document.querySelector('.vegetable-list');

        let benefitsData = [];
        const selectedBenefits = [];

        benefitsInput.addEventListener('input', async () => {
            const query = benefitsInput.value.toLowerCase().split(',').pop().trim();
            if (query.length >= 3) {
                if (benefitsData.length === 0) {
                    benefitsData = await RemoteData.getBenefit();
                }
                const filteredBenefits = benefitsData.filter((benefit) => benefit.benefit.toLowerCase().includes(query));
                showAutocomplete(filteredBenefits);
            } else {
                clearAutocomplete();
            }
        });

        searchButton.addEventListener('click', async () => {
            const benefitIds = selectedBenefits.map((benefit) => benefit.id);
            console.log(`selectedBenefits ${benefitIds}`);
            // const response = await fetch(`https://api.example.com/vegetables?benefits=${selectedBenefits.join(',')}`);
            // const vegetables = await response.json();
            // displayVegetables(vegetables);
        });

        function showAutocomplete(benefits) {
            clearAutocomplete();
            benefits.forEach((benefit) => {
                const item = document.createElement('div');
                item.innerText = benefit.benefit;
                item.addEventListener('click', () => {
                    if (selectedBenefits.find((b) => b.id === benefit.id)) {
                        alert('Manfaat sudah terpilih');
                    } else if (selectedBenefits.length >= 3) {
                        alert('Anda hanya bisa memilih maksimal 3 manfaat');
                    } else {
                        selectedBenefits.push({ id: benefit.id, name: benefit.benefit });
                        benefitsInput.value = selectedBenefits.map((b) => b.name).join(', ');
                        clearAutocomplete();
                    }
                });
                benefitsList.appendChild(item);
            });
        }

        function clearAutocomplete() {
            benefitsList.innerHTML = '';
        }
        return '';
    },
};

export default VegetableRecommendation;
