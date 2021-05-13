/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepHarvester');
 * mod.thing == 'a thing'; // true
 */
import { CreepRole } from "./CreepRole";
import { properties } from "../properties";

const { ROLE_HARVESTER, LIMIT_HARVESTER_MAX } = properties;

module.exports = class CreepRoleHarvester extends CreepRole {
  public run(creep: Creep) {
    if (creep.memory.harvester && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.harvester = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.harvester && creep.store.getFreeCapacity() === 0) {
      creep.memory.harvester = true;
      creep.say("⛽ Заправлять");
    }

    if (creep.memory.harvester) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure =>
          (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });
      // Если есть куда носить ресурсы, несем туда
      if (targets.length) {
        const target = Game.getObjectById(targets[0].id) as Structure;
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      } else {
        super.toSpawn(creep);
      }
    } else {
      super.mining(creep);
    }
  }

  public spawn() {
    super.spawn(ROLE_HARVESTER, LIMIT_HARVESTER_MAX);
  }
};
