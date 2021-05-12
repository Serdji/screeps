/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('TowerControl');
 * mod.thing == 'a thing'; // true
 */

module.exports = class TowerControl {

  run() {
    for (const name in Game.rooms) {
      // Выбираем все пушки
      const towers = Game.rooms[name].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
      });
      if ( towers.length ) {
        for (const name in towers) {
          const tower = Game.getObjectById( towers[name].id )
          if(tower) {
            this.attack(tower)
            this.heal(tower)
            this.repair(tower)
          }
        }
      }

    }
  }

  /**
   * Если есть кого атаковать АТАКУЕМ
   * @param tower
   */
  attack(tower) {
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    }
  }

  /**
   * Если есть что чинить ЧИНЕМ
   * @param tower
   */
  repair(tower) {
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }
  }

  /**
   * Если есть кого лечить ЛЕЧИМ
   * @param tower
   */
  heal(tower) {
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_CREEPS, {
      filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
      tower.heal(closestDamagedStructure);
    }
  }

};
