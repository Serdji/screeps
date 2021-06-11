import { CreepLoader } from "./CreepLoader";

export class CreepRoleFiller extends CreepLoader {
  private container: StructureContainer;
  public constructor(nameSpawn: string, properties: IProperties, containerId: string) {
    super(nameSpawn, properties);
    this.container = Game.getObjectById(containerId as Id<StructureContainer>) as StructureContainer; // Находим контейнер по ID
    this.spawn();
  }

  public run(creep: Creep) {
    this.toFiller(creep, this.container);
  }

  public toFiller(creep: Creep, container: StructureContainer) {
    super.toFiller(creep, container);
  }

  public spawn() {
    const { ROLE_FILLER, LIMIT_FILLER } = this.properties;
    super.spawn(ROLE_FILLER, LIMIT_FILLER);
  }
}
