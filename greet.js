module.exports = function (pool) {

    async function GreetLanguage(language, person) {

        if (!language) {
            return ""
        }

        let result = await pool.query('select * from greetings where names = $1', [person])

        if (result.rows.length == 0) {
            if (person !== '') {
                await pool.query('insert into greetings(names, counts) values($1, $2)', [person, 1])
            }
        } else {
            await pool.query("update greetings set counts=counts+1 where names=$1", [person]);
        }

        if (person !== '') {

            if (language === "English") {
                return "Hello, " + person;
            }
            if (language === "IsiXhosa") {
                return "Molo, " + person;
            }
            if (language === "Afrikaans") {
                return "Halo, " + person;
            }
        }

    }
    async function greete(name) {
        let greeted = await pool.query('select * from greetings where names =$1 ', [name])
        return greeted.rows;
    }
    async function Counter() {
        var counter = await pool.query('select count(*) from greetings ')
        return counter.rows[0].count
    }
    async function greetedNames() {
        var counter = await pool.query('select * from greetings  ')
        return counter.rows;
    }

    async function resetBtn() {
        var reset = await pool.query('delete from greetings ')
        return reset;
    }

    return {
        GreetLanguage,
        greete,
        Counter,
        resetBtn,
        greetedNames
    }
}
