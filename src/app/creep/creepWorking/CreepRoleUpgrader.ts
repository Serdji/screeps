/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleUpgrader');
 * mod.thing == 'a thing'; // true
 */
import { CreepWorking } from "./CreepWorking";

export class CreepRoleUpgrader extends CreepWorking {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;
      creep.say("⚡ Упгрейдить");
    }

    // Едем упгрейдить контролер
    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      super.mining(creep);
    }
  }

  public spawn(): void {
    const { ROLE_UPGRADER, LIMIT_UPGRADER_MAX } = this.properties;
    super.spawn(ROLE_UPGRADER, LIMIT_UPGRADER_MAX);
  }
}
