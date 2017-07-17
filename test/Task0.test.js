require('./database.test.js')

const expect = require('chai').expect
const sinon = require('sinon')

const Task = require('../models/Task')

describe('Task', function () {
  beforeEach(function () {
    sinon.stub(Task, 'find')
  })

  afterEach(function () {
    Task.find.restore()
  })

  it('should be invalid if task is empty', function (done) {
    const task = new Task()
    task.validate(function (err) {
      //console.log('#err.errors.title', err.errors.title)
      expect(err.errors.title).to.exist
      done()
    })
  })

  it('should send all tasks', function (done) {
    const a = {title: 'a'}
    const b = {title: 'b'}
    const expectedModels = [a, b]
    Task.find.yields(null, expectedModels)
    Task.find({}, (err, tasks) => {
      console.log('tasks:', tasks)
      done()
    })
  })

  it('should set default priority', function (done) {
    const toCreate = {title: 'Test', createdAt: new Date()}
    Task.create(toCreate)
      .then(created => {
        expect(created.priority).to.be.equal('MID')
        done()
      })
  })
})
