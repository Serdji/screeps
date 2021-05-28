/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleBuilder');
 * mod.thing == 'a thing'; // true
 */

import { CreepWorking } from "./CreepWorking";

export class CreepRoleBuilder extends CreepWorking {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }
  
  public run(creep: Creep): void {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say("🚧 Строить");
    }

    if (creep.memory.building) {
      const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);

      const structureTowers = creep.room.find(FIND_STRUCTURES, {
        filter: structure =>
          structure.structureType === STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });

      const structureRepairs = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
      });
      structureRepairs.sort((a, b) => a.hits - b.hits);

      // Если есть что сторить, крипс идет строить
      if (constructions.length) {
        const construction = Game.getObjectById(constructions[0].id) as ConstructionSite;
        if (creep.build(construction) === ERR_NOT_IN_RANGE) {
          creep.moveTo(construction, { visualizePathStyle: { stroke: "#ffffff" } });
        }
        // Заправить пушку, если нечего сторить
      } else if (structureTowers.length) {
        const structureTower = Game.getObjectById(structureTowers[0].id) as StructureTower;
        if (creep.transfer(structureTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structureTower, { visualizePathStyle: { stroke: "#ffffff" } });
        }
        // Пока нет пушки, заниматься ремонтом
      } else if (structureRepairs.length) {
        const structureRepair = Game.getObjectById(structureRepairs[0].id) as Structure;
        // if (creep.repair(structureRepair) === ERR_NOT_IN_RANGE) {
        //   creep.moveTo(structureRepair);
        // }
      } else {
        super.toSpawn(creep);
      }
    } else {
      super.mining(creep);
    }
  }

  public spawn(): void {
    const { ROLE_BUILDER, LIMIT_BUILDER_MAX } = this.properties;
    super.spawn(ROLE_BUILDER, LIMIT_BUILDER_MAX);
  }
}
