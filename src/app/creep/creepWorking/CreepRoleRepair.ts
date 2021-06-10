import { CreepWorking } from "./CreepWorking";

export class CreepRoleRepair extends CreepWorking {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    this.toRepair(creep);
  }

  public toRepair(creep: Creep) {
    super.toRepair(creep);
  }

  public spawn(): void {
    const { ROLE_REPAIR, LIMIT_REPAIR } = this.properties;
    super.spawn(ROLE_REPAIR, LIMIT_REPAIR);
  }
}
