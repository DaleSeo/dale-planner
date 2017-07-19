require('./database.test.js')

const expect = require('chai').expect
const sinon = require('sinon')

const Task = require('../models/Task')
const testTasks = [
  {title: 'Task1'},
  {title: 'Task2'},
  {title: 'Task3'}
]

describe('Task', function () {
  beforeEach(function (done) {
    Task.insertMany(testTasks)
    .then(_ => done())
    .catch(err => console.error(err))
  })

  afterEach(function (done) {
    Task.collection.drop()
    done()
  })

  it('should find', function (done) {
    Task.find({})
      .then(tasks => {
        // console.log(tasks)
        expect(tasks).to.have.lengthOf(3)
        done()
      })
  })

  it('should create', function (done) {
    Task.create({title: 'Task4'})
      .then(task => {
        // console.log(task)
        expect(task.title).to.be.equal('Task4')
        expect(task.status).to.be.equal('ToDo')
        expect(task.priority).to.be.equal('MID')
        expect(task.createdAt).to.be.a('date')
        done()
      })
  })

  it('should findOne', function (done) {
    Task.findOne({title: 'Task2'})
      .then(task => {
        console.log(task)
        expect(task.title).to.be.equal(testTasks[1].title)
        done()
      })
  })

})
