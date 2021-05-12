/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleMultiRoom');
 * mod.thing == 'a thing'; // true
 */

const CreepRole = require('CreepRole');

const {ROLE_MULTI_ROOM, LIMIT_MULTI_ROOM} = require('properties');

module.exports = class CreepRoleMultiRoom extends CreepRole {
  constructor(roomName) {
    super();
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
  }

  run(creep) {

    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== this.roomName && !creep.memory.upgrading) {
      const exitDir = Game.map.findExit(creep.room, this.roomName);
      const exit = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exit);
      // Как приехали в нужную комнату, начинаем работать
    } else {
      if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false;
        creep.say('🔄 Копать');
      }
      if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true;
        creep.say('⚡ Упгрейдить');
      }

      if (creep.memory.upgrading) {
        const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);

        // Ести есть что постороить, строим
        if (constructions.length) {
          const construction = Game.getObjectById(constructions[0].id)
          if (creep.build(construction) === ERR_NOT_IN_RANGE) {
            creep.moveTo(construction, {visualizePathStyle: {stroke: '#ffffff'}});
          }
        // Если нечего стоить и польностью забит клад, едем домой
        }  else {

          // Проверяем, если имя домашней комнаты не совпадает с комнотой в которой находися крипс, едем в ту комнату
          if (creep.memory.roomName !== creep.room.name && creep.memory.upgrading) {
            const exitDir = Game.map.findExit(creep.room, creep.memory.roomName);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
            // Если имена совпали, едем убгрейживать контролер
          } else {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
          }
        }


      } else {
        super.mining(creep)
      }

    }

  }


  spawn() {
    super.spawn(ROLE_MULTI_ROOM + this.roomName, LIMIT_MULTI_ROOM);
  }
};
