var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var remoteBuilder = require('role.remotebuilder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallrepairer');
var roleTowerHarvester = require('role.towerHarvester');

var r1Repairer = require('role.r1repairer');
var r1Harvester = require('role.r1.harvester');

var r2Attacker = require('role.r2.attacker');
var r2Builder = require('role.r2.builder');

var structureTower = require('structure.tower');


module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var tower = Game.getObjectById('58ca840f426e43913b715f5e');
    if(tower){
        structureTower.run(tower);
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var wallRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallRepairer');
    var remoteBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder');
    var r1Repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'r1Repairer');
    var r1Harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'r1Harvester');
    var towerHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHarvester');
    var r2Attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'r2Attacker');
    var r2Builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'r2Builder');

    if(harvesters.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }if(harvesters.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }else if(upgraders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }if(towerHarvesters.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'towerHarvester'});
        console.log('Spawning new towerHarvester: ' + newName);
    }else if(r1Harvesters.length < 6) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'r1Harvester'});
        console.log('Spawning new t1Harvester: ' + newName);
    }else if(upgraders.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }else if(builders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }else if(repairers.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
    }else if(r2Builders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'r2Builder'});
        console.log('Spawning new r2Builder: ' + newName);
    }else if(remoteBuilders.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'remoteBuilder'});
        console.log('Spawning new remoteBuilder: ' + newName);
    }else if(r1Repairers.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'r1Repairer'});
        console.log('Spawning new r1Repairer: ' + newName);
    }else if(repairers.length < 5) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
    }else if(wallRepairers.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'wallRepairer'});
        console.log('Spawning new wallRepairer: ' + newName);
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.ticksToLive < 300){
            renew = Game.spawns['Spawn1'].renewCreep(creep);
            console.log('Renewing Creep: ' + renew);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }else if(creep.memory.role == 'remoteHarvester') {
            remoteHarvester.run(creep);
        }else if(creep.memory.role == 'remoteBuilder') {
            remoteBuilder.run(creep);
        }else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }else if(creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }else if(creep.memory.role == 'r1Repairer') {
            r1Repairer.run(creep);
        }else if(creep.memory.role == 'r1Harvester') {
            r1Harvester.run(creep);
        }else if(creep.memory.role == 'towerHarvester') {
            roleTowerHarvester.run(creep);
        }else if(creep.memory.role == 'r2Builder'){
            r2Builder.run(creep);
        }
    }
}