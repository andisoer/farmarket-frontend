import API_ENDPOINT from '../scripts/globals/api-endpoint.js';

const RemoteData = {
  async getVegetables() {
    const response = await fetch(API_ENDPOINT.VEGETABLES);
    const responseJson = await response.json();

    if (responseJson.error) {
      throw Error('Failed to fetch vegetables');
    }

    const { data: vegetables } = responseJson;

    if (vegetables.length > 0) {
      return vegetables;
    }

    throw Error("There's no vegetable at the moment :(");
  },
  async getDetailVegetable(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_VEGETABLE(id));
    const responseJson = await response.json();

    if (responseJson.error) {
      throw Error('Failed to fetch vegetable detail');
    }

    const { data: vegetableDetail } = responseJson;

    return vegetableDetail;
  },
};

export default RemoteData;
