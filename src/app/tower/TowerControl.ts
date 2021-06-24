/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('TowerControl');
 * mod.thing == 'a thing'; // true
 */

export class TowerControl {
  public constructor(properties: IProperties) {
    const { HITS_MAX } = properties;
    for (const name in Game.rooms) {
      // Выбираем все пушки
      const towers = Game.rooms[name].find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
      }) as StructureTower[];
      if (towers.length) {
        for (const index in towers) {
          const tower = Game.getObjectById(towers[index].id);
          if (tower) {
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: structure =>
                structure.hits < structure.hitsMax &&
                structure.hits <= HITS_MAX &&
                structure.structureType !== STRUCTURE_WALL
            });
            const hilCreeps = tower.pos.findClosestByRange(FIND_CREEPS, {
              filter: structure => structure.hits < structure.hitsMax
            });
            // Если есть кого атаковать, атакуем в первую очередь
            if (closestHostile) {
              tower.attack(closestHostile);
            } else {
              // Есле нет кого атаковать, занимаемся ремонтом
              if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
                // И только в последнюю очередь зиллим
              } else {
                if (closestDamagedStructure) {
                  tower.heal(closestDamagedStructure);
                }
              }
            }
          }
        }
      }
    }
  }
}
