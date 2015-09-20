var _ = require('lodash')

module.exports = function(staypi_model){
	//compute loopback specific attributes from staypi attributes 
	var loopback_attributes = {}
	var required_array = null

	for(var model in staypi_model){
		loopback_attributes[model] = {}
		//console.log('model- '+model)
		//console.log(staypi_model[model].attributes)
		loopback_attributes[model].name = model
		loopback_attributes[model].properties = _.clone(staypi_model[model].attributes.properties,true)
		loopback_attributes[model].description = _.clone(staypi_model[model].attributes.description,true)

		required_array = staypi_model[model].attributes.required

		//iterate through each property
		for(var property in loopback_attributes[model].properties){
			loopback_attributes[model].properties[property].type = _.capitalize(staypi_model[model].attributes.properties[property].type)

			if(_.includes(required_array, property)){
				loopback_attributes[model].properties[property].required = true
			}
		}
	}

	console.log('loopback_attributes')
	console.log(loopback_attributes)

	return loopback_attributes
}