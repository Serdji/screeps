import { CreepClime } from "./CreepClime";

export class CreepRoleReserve extends CreepClime {
  private roomNames: string[];
  public constructor(roomNames: string[], nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.roomNames = roomNames; // Имя комнаты, куда отправляем крипса
    this.spawn();
  }

  public run(creep: Creep): void {
    if (!this.toRooms(creep, this.roomNames)) {
      this.toReserveController(creep);
    }
  }

  public toReserveController(creep: Creep) {
    super.toReserveController(creep);
  }

  public toRooms(creep: Creep, roomNames: string[]): boolean {
    return super.toRooms(creep, roomNames);
  }

  public spawn(): void {
    const { ROLE_RESERVE, LIMIT_RESERVE } = this.properties;
    super.spawn(ROLE_RESERVE + this.roomNames.join("#"), LIMIT_RESERVE as ILimitCreep);
  }
}
