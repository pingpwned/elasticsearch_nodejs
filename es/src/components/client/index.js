import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
    host: 'https://search-wazup-mr-deer-mk6lluli7el4xy2czteszbktum.eu-central-1.es.amazonaws.com/'
});

export default client;