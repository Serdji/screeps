/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleAttack');
 * mod.thing == 'a thing'; // true
 */

import { CreepRole } from "./CreepRole";

export class CreepRoleAttack extends CreepRole {
  public constructor(nameSpawn: string, properties: { [ket: string]: any }) {
    super(nameSpawn, properties);
    this.spawn();
  }
  
  public run(creep: Creep): void {
    if ("W8N3" !== creep.room.name) {
      const exitDir = Game.map.findExit(creep.room, "W8N3") as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
      // Если имена совпали, едем убгрейживать контролер
    } else {
      const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (target) {
        if (creep.attack(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else {
        this.patrolling(creep);
      }
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
        if (creep.memory.counter >= (PATROLLING_COORDINATES as [[number, number]]).length - 1) creep.memory.isForward = false;
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
