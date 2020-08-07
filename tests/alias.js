module.exports = async ({ test, alike }) => {

    const clia = require('../index')

    const cli = (text, alias) => text && clia(text.split(' '), alias) || clia()

    return [
        test("alias does not add args or opt if they are not set", () => {
            alike(cli('-f banana apple --ananas dog cat', ['a', 'bark', 'york']), {
                arg: { ananas: 'dog', f: 'banana' },
                args: { f: ['banana', 'apple'], ananas: ['dog', 'cat'] },
                opt: { f: true, ananas: true },
                plain: []
            })
        })
        , test("alias sets arg and args values", () => {
            alike(cli('-f banana apple --ananas dog cat', ['fruit', 'ananas']), {
                arg: { fruit: 'banana', ananas: 'dog', f: 'banana' },
                args: {
                    f: ['banana', 'apple'],
                    ananas: ['dog', 'cat'],
                    fruit: ['banana', 'apple']
                },
                opt: { f: true, ananas: true, fruit: true },
                plain: []
            })
        })
    ]
}