import { Debugger } from "inspector";
import { CreepMiner } from "./CreepMiner";

export class CreepRoleMiner extends CreepMiner {
  private suffixName: string;
  private container: StructureContainer;
  private parkingCoordinates: RoomPosition;
  public constructor(
    suffixName: string,
    nameSpawn: string,
    properties: IProperties,
    containerId: string
  ) {
    super(nameSpawn, properties);
    this.suffixName = suffixName; // Имя комнаты, куда отправляем крипса
    this.container = Game.getObjectById(containerId as Id<StructureContainer>) as StructureContainer; // Находим контейнер по ID
    this.parkingCoordinates = this.container.pos; // Координаты контейнера
    this.spawn();
  }

  public run(creep: Creep): void {
    if (this.parking(creep, this.parkingCoordinates)) this.toStaticHarvester(creep);
  }

  public toStaticHarvester(creep: Creep) {
    super.toStaticHarvester(creep);
  }

  public parking(creep: Creep, parkingCoordinates: RoomPosition): boolean {
    return super.parking(creep, parkingCoordinates);
  }

  public spawn() {
    const { ROLE_MINER, LIMIT_MINER } = this.properties;
    super.spawn(ROLE_MINER + this.suffixName, LIMIT_MINER);
  }
}
