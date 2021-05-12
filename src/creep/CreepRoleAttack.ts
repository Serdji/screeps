/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleAttack');
 * mod.thing == 'a thing'; // true
 */

const CreepRole = require('creep/CreepRole');

const {
  ROLE_ATTACK,
  LIMIT_ATTACK_MAX,
  PATROLLING_COORDINATES,
} = require('properties');

module.exports = class CreepRoleAttack extends CreepRole {


  run( creep ) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(target) {
      if(creep.attack(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      this.patrolling(creep)
    }
  }


  /**
   * Метод для потрулирование атакующих крипсов
   * @param creep
   */
  patrolling( creep ) {
    PATROLLING_COORDINATES.forEach( ( [ x, y ], i ) => {
      if( creep.memory.isForward ) {
        if( creep.memory.counter === i ) {
          if( creep.pos.x === x && creep.pos.y === y ) creep.memory.counter++;
          creep.moveTo( x, y )
        }
        if( creep.memory.counter >= PATROLLING_COORDINATES.length - 1 ) creep.memory.isForward = false;
      } else {
        if( creep.memory.counter === i ) {
          if( creep.pos.x === x && creep.pos.y === y ) creep.memory.counter--;
          creep.moveTo( x, y )
          if( creep.memory.counter <= 0 ) creep.memory.isForward = true;
        }
      }
    } )
  }

  spawn() {
    super.spawn(ROLE_ATTACK, LIMIT_ATTACK_MAX);
  }

};
