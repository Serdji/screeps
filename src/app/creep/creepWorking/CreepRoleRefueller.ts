import { CreepWorking } from "./CreepWorking";

export class CreepRoleRefueller extends CreepWorking {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    this.toRefueller(creep);
  }

  public toRefueller(creep: Creep) {
    super.toRefueller(creep);
  }

  public spawn(): void {
    const { ROLE_REFUELLER, LIMIT_REFUELLER_MAX } = this.properties;
    super.spawn(ROLE_REFUELLER, LIMIT_REFUELLER_MAX);
  }
}
