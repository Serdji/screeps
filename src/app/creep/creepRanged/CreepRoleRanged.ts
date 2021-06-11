import { CreepRanged } from "./CreepRanged";

export class CreepRoleRanged extends CreepRanged {
  private suffixName: string;
  private rampart: StructureRampart;
  private parkingCoordinates: RoomPosition;
  public constructor(
    suffixName: string,
    nameSpawn: string,
    properties: IProperties,
    rampartId: string
  ) {
    super(nameSpawn, properties);
    this.suffixName = suffixName; // Имя комнаты, куда отправляем крипса
    this.rampart = Game.getObjectById(rampartId as Id<StructureRampart>) as StructureRampart;
    this.parkingCoordinates = this.rampart.pos;
    this.spawn();
  }

  public run(creep: Creep): void {
    if (this.parking(creep, this.parkingCoordinates)) this.toRanged(creep);
  }

  public toRanged(creep: Creep) {
    super.toRanged(creep);
  }

  public parking(creep: Creep, parkingCoordinates: RoomPosition): boolean {
    return super.parking(creep, parkingCoordinates);
  }

  public spawn() {
    const { ROLE_RANGED, LIMIT_RANGED } = this.properties;
    super.spawn(ROLE_RANGED + this.suffixName, LIMIT_RANGED);
  }
}
