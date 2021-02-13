const f = require('../functions')
const url = require('../httpOptions')

class Competitions {
    /**
     * Gets the latest competitions
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of competitions
     */
    async competitions(format = true){
        var competitions = await f.getData.simple(url.tabs.events)

        if (!format) return competitions.competitions
        else {
            var competitions_tmp = []
            competitions.competitions.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                competitions_tmp.push(e)
            })
            return competitions_tmp
        }
    }

    /**
     * Search a competition
     * @param {string} search The competition to search
     * @param {boolean} format Defaults to true, removes chat formatting codes
     * @returns {array} The list of competitions
     */
    async searchCompetitions(search, format = true){
        var competitions = await f.getData.page(url.tabs.clubs, '0?search=' + search.replace(' ', "%20"))

        if (!format) return competitions.competitions
        else {
            var competitions_tmp = []
            competitions.competitions.forEach(e=>{
                Object.entries(e).forEach(entry => {
                    const [key, value] = entry;

                    if (key == 'name') e[key] = f.stripFormatting(value)
                    else e[key] = value
                });
                competitions_tmp.push(e)
            })
            return competitions_tmp
        }
    }

    /**
     * Gets the competition info
     * @param {number} competitionId The ID of the competition
     * @returns {array} The information about this competition
     */
    async competition(competitionId){
        var competition = await f.getData.page(url.tabs.comp, competitionId)

        return competition
    }

    /**
     * Gets the competition results
     * @param {number} competitionId The ID of the competition
     * @param {number} roundsNumber The number of the round, in chronological. Defaults to 1
     * @param {number} match The match number. Defaults to 1
     * @returns {array} The information about this COTD
     */
    async competitionResults(competitionId, roundsNumber = 1, match = 1){
        if (roundsNumber < 1) roundsNumber = 1
        if (match < 1) match = 1
        var competition = await this.competition(competitionId)
        var results = await f.getData.page(url.tabs.comp, competitionId+`/results/${competition.rounds[roundsNumber-1].matches[match-1].id}/0`)

        return results.results
    }
}

module.exports = Competitions