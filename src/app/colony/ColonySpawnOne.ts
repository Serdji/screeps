import { Colony } from "./Colony";

export class ColonySpawnOne extends Colony {
  private nameSpawn: string;
  private properties: IProperties;

  public constructor(nameSpawn: string, properties: IProperties) {
    super();
    this.nameSpawn = nameSpawn;
    this.properties = properties;
    this.run();
  }

  public run(): void {
    super.run(this.properties);
    this.runWorkingColony();
    this.runWorkingAbroad();
  }

  private runWorkingColony() {
    this.spawnCreepRoleHarvester(this.nameSpawn, this.properties);
    this.spawnCreepRoleUpgrader(this.nameSpawn, this.properties);
    this.spawnCreepRoleBuilder(this.nameSpawn, this.properties);
    this.spawnCreepRoleRefueller(this.nameSpawn, this.properties);
    this.spawnCreepRoleRepair(this.nameSpawn, this.properties);
    this.spawnCreepRoleAttack(this.nameSpawn, this.properties);
    this.spawnCreepRoleStorage(this.nameSpawn, this.properties);
    this.spawnCreepRoleFiller(this.nameSpawn, this.properties);

    this.spawnCreepRoleMiner("1", this.nameSpawn, this.properties, "7f99bad8557fe20");
    this.spawnCreepRoleMiner("2", this.nameSpawn, this.properties, "7530fa6a11d02ef");

    // this.spawnCreepRoleRanged("1", this.nameSpawn, this.properties, "");
    // this.spawnCreepRoleRanged("2", this.nameSpawn, this.properties, "");
  }

  private runWorkingAbroad() {
    this.spawnWorkingAbroadHarvester(
      "W7N3",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 2, level: 1 })
    );

    this.spawnWorkingAbroadUpgrader(
      "W7N3",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 1, level: 1 })
    );

    this.spawnWorkingAbroadUpgrader(
      "W7N4",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 3, level: 1 })
    );

    this.spawnWorkingAbroadHarvester(
      "W8N2",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 2, level: 1 })
    );

    this.spawnWorkingAbroadUpgrader(
      "W8N2",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 2, level: 1 })
    );

    // this.spawnWorkingAbroadAttack(
    //   "W6N3",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 3, level: 1 }),
    //   [
    //     [40, 35],
    //     [48, 35]
    //   ]
    // );

    this.spawnCreepRoleReserve("W7N3", this.nameSpawn, _.set(this.properties, "LIMIT_RESERVE", { size: 1, level: 2 }));
    this.spawnCreepRoleReserve("W7N4", this.nameSpawn, _.set(this.properties, "LIMIT_RESERVE", { size: 1, level: 2 }));
    this.spawnCreepRoleReserve("W8N2", this.nameSpawn, _.set(this.properties, "LIMIT_RESERVE", { size: 1, level: 2 }));
  }

  public spawnCreepRoleHarvester(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleHarvester(nameSpawn, properties);
  }

  public spawnCreepRoleUpgrader(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleUpgrader(nameSpawn, properties);
  }

  public spawnCreepRoleBuilder(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleBuilder(nameSpawn, properties);
  }

  public spawnCreepRoleRefueller(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleRefueller(nameSpawn, properties);
  }

  public spawnCreepRoleFiller(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleFiller(nameSpawn, properties);
  }

  public spawnCreepRoleRepair(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleRepair(nameSpawn, properties);
  }

  public spawnCreepRoleStorage(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleStorage(nameSpawn, properties);
  }

  public spawnCreepRoleAttack(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleAttack(nameSpawn, properties);
  }

  public spawnWorkingAbroadHarvester(roomName: string, spawnName: string, properties: IProperties) {
    super.spawnWorkingAbroadHarvester(roomName, spawnName, properties);
  }

  public spawnWorkingAbroadUpgrader(roomName: string, spawnName: string, properties: IProperties) {
    super.spawnWorkingAbroadUpgrader(roomName, spawnName, properties);
  }

  public spawnWorkingAbroadAttack(
    roomName: string,
    spawnName: string,
    properties: IProperties,
    patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]
  ) {
    super.spawnWorkingAbroadAttack(roomName, spawnName, properties, patrollingCoordinates);
  }

  public spawnCreepRoleReserve(roomName: string, spawnName: string, properties: IProperties) {
    super.spawnCreepRoleReserve(roomName, spawnName, properties);
  }

  public spawnCreepRoleRanged(suffixName: string, nameSpawn: string, properties: IProperties, rampartId: string) {
    super.spawnCreepRoleRanged(suffixName, nameSpawn, properties, rampartId);
  }

  public spawnCreepRoleMiner(suffixName: string, nameSpawn: string, properties: IProperties, containerId: string) {
    super.spawnCreepRoleMiner(suffixName, nameSpawn, properties, containerId);
  }
}
