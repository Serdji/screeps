import { CreepLoader } from "./CreepLoader";

export class CreepRoleStorage extends CreepLoader {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    const { STORAGE_CONTAINER_IDS } = this.properties;
    this.toRouteContainerToStorage(creep, STORAGE_CONTAINER_IDS);
  }

  public toRouteContainerToStorage(creep: Creep, containerIds: IProperties["STORAGE_CONTAINER_IDS"]) {
    super.toRouteContainerToStorage(creep, containerIds);
  }

  public spawn() {
    const { ROLE_STORAGE, LIMIT_STORAGE } = this.properties;
    super.spawn(ROLE_STORAGE, LIMIT_STORAGE);
  }
}
