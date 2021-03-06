import knex from './knex.js'

export default {
  Shows: () => knex('shows'),
  getAll () {
    return this.Shows().select()
  },
  getSingle (showID) {
    return this.Shows().where('id', showID * 1).first()
  },
  addSingle (show) {
    return this.Shows().insert(show, 'id')
  },
  editSingle (showID, updates) {
    return this.Shows().where('id', showID * 1).update(updates)
  },
  deleteSingle(showID) {
    return this.Shows().where('id', showID * 1).del()
  }
}
