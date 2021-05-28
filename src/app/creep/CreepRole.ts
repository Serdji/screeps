export class CreepRole {
  public nameSpawn: string;
  public properties: IProperties;

  public constructor(nameSpawn: string, properties: IProperties) {
    this.nameSpawn = nameSpawn;
    this.properties = properties;
  }

  public run(creep: Creep): void {}

  /**
   * Рандомное распределение крисаов на майниг ресурсов
   * @param creep
   */
  public mining(creep: Creep): void {
    const sources: Source[] = creep.room.find(FIND_SOURCES);
    const quantitySources = sources.length - 1;
    if (creep.memory.sourceID === null) {
      const sourceId: Id<Source> = sources[_.random(0, quantitySources)].id;
      creep.memory.sourceID = sourceId;
    }
    const source = Game.getObjectById(creep.memory.sourceID) as Source;
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }

  /**
   * Отправка крипса на спавн
   * @param creep
   */
  public toSpawn(creep: Creep): void {
    const spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_SPAWN
    }) as StructureSpawn;
    if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  }

  /**
   * Собираем фит для крипса
   * @param fit Массив с телом крипса
   * @param role Роль
   * @param sourceID Индекс ресурса на ктороый пойдет майнить крипс
   * @param roomName Имя комноты в которой был создан крипс
   * @param level Уровень крипса
   */
  public spawnFit(
    fit: BodyPartConstant[],
    role: CreepMemory["role"],
    sourceID: CreepMemory["sourceID"],
    roomName: CreepMemory["roomName"],
    level: CreepMemory["level"],
    isForward: CreepMemory["isForward"] = true,
    counter: CreepMemory["counter"] = 0
  ): void {
    const nameCreep = `${this.makeId()}${Game.time}${role}${level}`;
    const memory = {
      role,
      sourceID,
      roomName,
      isForward,
      counter,
      level
    } as CreepMemory;
    if (Game.spawns[this.nameSpawn].spawnCreep(fit, nameCreep, { memory }) === OK) {
      console.log(`Новый крипт | Роль -> ${role} | Имя -> ${nameCreep}`);
    }
  }

  /**
   * Рандомная генерация имени крипса
   * @returns {string}
   */
  private makeId(): string {
    const { SIZE_NAME_CREEP } = this.properties;
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < SIZE_NAME_CREEP; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
