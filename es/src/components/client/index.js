import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
    host: 'http://18.184.159.62:9200',
    log: 'trace'
});

export default client;