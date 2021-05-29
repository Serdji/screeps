import { CreepWorking } from "./CreepWorking";

export class CreepRoleRefueller extends CreepWorking {
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
      creep.say("⛽ Заправлять");
    }

    if (creep.memory.building) {
      const structureTowers = creep.room.find(FIND_STRUCTURES, {
        filter: structure =>
          structure.structureType === STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });

      const structureRepairs = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
      });
      structureRepairs.sort((a, b) => a.hits - b.hits);

        // Заправить пушку, если нечего сторить
      if (structureTowers.length) {
        const structureTower = Game.getObjectById(structureTowers[0].id) as StructureTower;
        if (creep.transfer(structureTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structureTower, { visualizePathStyle: { stroke: "#ffffff" } });
        }
        // Пока нет пушки, заниматься ремонтом
      } else {
        super.toSpawn(creep);
      }
    } else {
      super.mining(creep);
    }
  }

  public spawn(): void {
    const { ROLE_REFUELLER, LIMIT_REFUELLER_MAX } = this.properties;
    super.spawn(ROLE_REFUELLER, LIMIT_REFUELLER_MAX);
  }
}
