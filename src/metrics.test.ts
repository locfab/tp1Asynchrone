import { expect } from 'chai'
import { Metric, MetricsHandler } from './metrics'
import { LevelDb } from "./leveldb"

const dbPath: string = 'db_test'
var dbMet: MetricsHandler

describe('Metrics', function () {
    before(function () {
        LevelDb.clear(dbPath)
        dbMet = new MetricsHandler(dbPath)
    })

    describe('#get', function () {
        it('should get empty array on non existing group', function () {
            dbMet.get("0", function (err: Error | null, result?: Metric[]) {
                expect(err).to.be.null
            })
        })
    })
    describe('#save', function () {
        describe('#creta', function () {
            beforeEach(function () {
                dbMet.save('1', [{ timestamp: '1384686660000', value:10 }],function (err: Error | null) {
                })
            })
            it('should update metric', function () {
                dbMet.save('1', [{ timestamp: '1384686660000', value:11 }],function (err: Error | null) {
                    expect(err).to.be.null
                })
            })
        })
        it('should create metric', function () {
            dbMet.save('1', [{ timestamp: '1384686660000', value:10 }],function (err: Error | null) {
                expect(err).to.be.null
            })
        })
    })
    describe('#delete', function () {
        describe('delete on existing metric', function () {
            beforeEach(function () {
                dbMet.save('1', [{ timestamp: '1384686660000', value:10 }],function (err: Error | null) {
                })
            })
            it('should delete metric', function () {
                dbMet.delete('1', "1384686660000",  function (err: Error | null) {
                    expect(err).to.be.null
                });
            })
        })
        it('should delete non metric because no create without error', function () {
            dbMet.delete('1', "1384686660000", function (err: Error | null) {
                expect(err).to.be.null
            });
        })
    })

    after(function () {
        dbMet.close()
    })
})