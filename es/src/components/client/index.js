import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
    host: 'http://185.119.98.17:9200',
    log: 'trace'
});

export default client;