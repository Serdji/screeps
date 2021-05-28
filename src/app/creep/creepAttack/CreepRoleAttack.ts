/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleAttack');
 * mod.thing == 'a thing'; // true
 */
import { CreepAttack } from "./CreepAttack";

export class CreepRoleAttack extends CreepAttack {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    // Ищим вражеских кпсов
    const hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // Ищим вражеские страения
    const structureInvaderCores = creep.room.find(FIND_HOSTILE_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_INVADER_CORE
    });

    if (hostileCreeps) {
      if (creep.attack(hostileCreeps) === ERR_NOT_IN_RANGE) {
        creep.moveTo(hostileCreeps);
      }
    } else if (structureInvaderCores.length) {
      const structureInvaderCore = Game.getObjectById(structureInvaderCores[0].id) as StructureInvaderCore;
      if (creep.attack(structureInvaderCore) === ERR_NOT_IN_RANGE) {
        creep.moveTo(structureInvaderCore);
      }
    } else {
      this.patrolling(creep);
    }
  }

  /**
   * Метод для потрулирование атакующих крипсов
   * @param creep
   */
  private patrolling(creep: Creep) {
    const { PATROLLING_COORDINATES } = this.properties;
    (PATROLLING_COORDINATES as [[number, number]]).forEach(([x, y], i) => {
      if (creep.memory.isForward) {
        if (creep.memory.counter === i) {
          if (creep.pos.x === x && creep.pos.y === y) creep.memory.counter++;
          creep.moveTo(x, y);
        }
        if (creep.memory.counter >= (PATROLLING_COORDINATES as [[number, number]]).length - 1)
          creep.memory.isForward = false;
      } else {
        if (creep.memory.counter === i) {
          if (creep.pos.x === x && creep.pos.y === y) creep.memory.counter--;
          creep.moveTo(x, y);
          if (creep.memory.counter <= 0) creep.memory.isForward = true;
        }
      }
    });
  }

  public spawn() {
    const { ROLE_ATTACK, LIMIT_ATTACK_MAX } = this.properties;
    super.spawn(ROLE_ATTACK, LIMIT_ATTACK_MAX);
  }
}
