import { CreepClime } from "./CreepClime";

export class CreepRoleReserve extends CreepClime {
  private roomName: string;
  public constructor(roomName: string, nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
    this.spawn();
  }

  public run(creep: Creep): void {
    if (this.toRoom(creep, this.roomName)) {
      this.toReserveController(creep);
    }
  }

  public toReserveController(creep: Creep) {
    super.toReserveController(creep);
  }

  public toRoom(creep: Creep, roomName: string): boolean {
    return super.toRoom(creep, roomName);
  }

  public spawn(): void {
    const { ROLE_RESERVE, LIMIT_RESERVE } = this.properties;
    super.spawn(ROLE_RESERVE + this.roomName, LIMIT_RESERVE as ILimitCreep);
  }
}
