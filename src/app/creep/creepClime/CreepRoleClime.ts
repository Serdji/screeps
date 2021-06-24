import { CreepClime } from "./CreepClime";

export class CreepRoleClime extends CreepClime {
  private roomName: string;
  public constructor(roomName: string, nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
    this.spawn();
  }

  public run(creep: Creep): void {
    if (this.toRoom(creep, this.roomName)) {
      this.toClimeController(creep);
    }
  }

  public toClimeController(creep: Creep) {
    super.toClimeController(creep);
  }

  public toRoom(creep: Creep, roomName: string): boolean {
    return super.toRoom(creep, roomName);
  }

  public spawn(): void {
    const { ROLE_CLIME, LIMIT_CLIME } = this.properties;
    super.spawn(ROLE_CLIME + this.roomName, LIMIT_CLIME as ILimitCreep);
  }
}
