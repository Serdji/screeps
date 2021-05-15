/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleAttack');
 * mod.thing == 'a thing'; // true
 */

import common from "mocha/lib/interfaces/common";
import { CreepRole } from "./CreepRole";

export class CreepRoleAttack extends CreepRole {
  private roomNameAttack: { name: string; isAttack: boolean };
  public constructor(
    nameSpawn: string,
    properties: { [ket: string]: any },
    roomNameAttack: { name: string; isAttack: boolean }
  ) {
    super(nameSpawn, properties);
    this.roomNameAttack = roomNameAttack;
    this.spawn();
  }

  public run(creep: Creep): void {
    const { name, isAttack } = this.roomNameAttack;

    // Если стоит флаг аттаки
    if (isAttack) {
      // Проверяем в той ли комнате находиться крипс, если нет кедем нее
      if (name !== creep.room.name) {
        const exitDir = Game.map.findExit(creep.room, name) as ExitConstant;
        const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
        creep.moveTo(exit);
        // Если имена совпали, едем проверяем, есть ли кого такавать
      } else {
        this.toAttack(creep);
      }
      // Иначи едем домой
    } else {
      // Проверяем, если имя домашней комнаты не совпадает с комнотой в которой находися крипс, едем в ту комнату
      if (creep.memory.roomName !== creep.room.name && creep.memory.upgrading) {
        const exitDir = Game.map.findExit(creep.room, creep.memory.roomName) as ExitConstant;
        const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
        creep.moveTo(exit);
        // Если имена совпали, выполняем метод аттаки
      } else {
        this.toAttack(creep);
      }
    }

    if (name !== creep.room.name) {
      const exitDir = Game.map.findExit(creep.room, name) as ExitConstant;
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
   * Метод аттаки
   * @param creep
   * @private
   */
  private toAttack(creep: Creep): void {
    // Ищим вражеских кпсов
    const hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // Ищим вражеские страения
    const structureInvaderCore = creep.room.find(FIND_HOSTILE_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_INVADER_CORE
    });

    if (hostileCreeps) {
      if (creep.attack(hostileCreeps) === ERR_NOT_IN_RANGE) {
        creep.moveTo(hostileCreeps);
      }
    } else if (structureInvaderCore) {
      if (creep.attack(structureInvaderCore[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(structureInvaderCore[0]);
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
