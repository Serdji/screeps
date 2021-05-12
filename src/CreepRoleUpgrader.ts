/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleUpgrader');
 * mod.thing == 'a thing'; // true
 */

const CreepRole = require('CreepRole');

const { ROLE_UPGRADER, LIMIT_UPGRADER_MAX } = require('properties');

module.exports = class CreepRoleUpgrader extends CreepRole {
  run( creep ) {
    if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 Копать');
    }
    if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;
      creep.say('⚡ Упгрейдить');
    }

    // Едем упгрейдить контролер
    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      super.mining( creep );
    }
  }

  spawn() {
    super.spawn(ROLE_UPGRADER, LIMIT_UPGRADER_MAX);
  }
};
