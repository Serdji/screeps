import { CreepRanged } from "./CreepRanged";

export class CreepRoleRanged extends CreepRanged {
  private suffixName: string;
  private parkingCoordinates: [number, number];
  public constructor(
    suffixName: string,
    nameSpawn: string,
    properties: IProperties,
    parkingCoordinates: [number, number]
  ) {
    super(nameSpawn, properties);
    this.suffixName = suffixName; // Имя комнаты, куда отправляем крипса
    this.parkingCoordinates = parkingCoordinates; // Координаты стоянке
    this.spawn();
  }

  public run(creep: Creep): void {
    if (this.parking(creep, this.parkingCoordinates)) this.toRanged(creep);
  }

  public toRanged(creep: Creep) {
    super.toRanged(creep);
  }

  public parking(creep: Creep, parkingCoordinates: [number, number]): boolean {
    return super.parking(creep, parkingCoordinates);
  }

  public spawn() {
    const { ROLE_RANGED, LIMIT_RANGED } = this.properties;
    super.spawn(ROLE_RANGED + this.suffixName, LIMIT_RANGED);
  }
}
