const assert = require('assert');
const Greetfactory = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/greetings_tests';

const pool = new Pool({
    connectionString
});

describe('The basic database web app tests', function () {
    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query('delete from greetings');
    });

    it('should return 1 for the counter if the same name has been greeted twice ', async function () {

        // the Factory Function is called Greet
        let gree = Greetfactory(pool);

        await gree.GreetLanguage("siphenkosi", 'English');
        await gree.GreetLanguage("siphenkosi", 'English');

        assert.equal(1, await gree.Counter());

    });

    it('should return  " hey salman "  when salman is greeted in English  ', async function () {

        // the Factory Function is called Greet
        let gree = Greetfactory(pool);


        assert.equal("Hello, salman", await gree.GreetLanguage("English", 'salman'));

    });
    it('should  greet siphenkosi in Afrikaans ', async function () {

        // the Factory Function is called Greet
        let gree = Greetfactory(pool);

        let greet = await gree.GreetLanguage("Afrikaans", 'siphenkosi');

        assert.equal("Halo, siphenkosi", greet);


    });

    it('should greet 3 people and return 3 for the Counter ', async function () {

        // the Factory Function is called Greet
        let gree = Greetfactory(pool);

        await gree.GreetLanguage("siphenkosi", 'Afrikaans');
        await gree.GreetLanguage("sino", 'IsiXhosa');
        await gree.GreetLanguage("vuyo", 'English');

        assert.equal(3, await gree.Counter());

    });
    it('should return nothing if no one is greeted', async function () {

        // the Factory Function is called Greet
        let gree = Greetfactory(pool);

        let greet = await gree.GreetLanguage("");

        assert.equal("", greet);

    });
    after(function () {
        pool.end();
    })
});