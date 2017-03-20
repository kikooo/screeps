var roleHarvester = {

    run: function(creep) {
        if(creep.memory.feeding && creep.carry.energy == 0) {
            creep.memory.feeding = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.feeding && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.feeding = true;
	        creep.say('🚧 feed');
	    }
	    
	    if(creep.memory.feeding) {
	        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#7fff00'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	}
};

module.exports = roleHarvester;