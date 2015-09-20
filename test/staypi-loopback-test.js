var staypiRead = require('staypi-read-model')
var expect = require('chai').expect
var path = require("path")
var _ = require('lodash')
var test_model_path = path.join(process.cwd(), 'staypi-test-data/yeloni/app/models')
var staypiLoopBackAttributes = require('../staypi-loopback-attributes')
var staypiLoopBack = require('../staypi-loopback')
var fs = require('fs');

describe('Staypi Loopback', function() {
    var staypi_models = null,
        loopback_models = null,
        loopback_attributes = null

    describe('Create Attributes', function() {

        before(function(done) {
            staypiRead.loadModelsFromFolder(test_model_path)
                .then(function(models) {
                    console.log('Models Successfully Read from- '+test_model_path+'\n')

                    staypi_models = models
                    loopback_attributes = staypiLoopBackAttributes(staypi_models)
                    fs.writeFileSync('test/loopback_attributes.json', JSON.stringify(loopback_attributes));

                    done()
                }, function() {
                    console.log('Unable to read models')
                })
        })



        it('- WebPage should have website_id attribute as required', function(done) {
            expect(loopback_attributes).to.have.deep.property('WebPage.website_id.required', true)
        })

        it('- Visit should have timestamp attribute as required', function(done) {

            //Visit should have timestamp as required
            expect(loopback_attributes).to.have.deep.property('Visit.timestamp.required', true)
        })

        it("- Visit shoud have rel_browser as an optional attribute", function(done) {
            expect(loopback_attributes).to.have.deep.property('Visit.rel_browser.type', 'object')
            expect(loopback_attributes).to.have.deep.property('Visit.rel_browser.required', true)
        })

        it("- Visit shoud have referrer_domain_id as an optional attribute", function(done) {
            expect(loopback_attributes).to.have.deep.property('Visit.referrer_domain_id')
            expect(loopback_attributes).to.not.have.deep.property('Visit.referrer_domain_id.required', true)
        })

    })

})