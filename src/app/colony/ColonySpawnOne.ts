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
    super.run();
    this.runPrivateRoleCreeps();
    this.runPublicRoleCreeps();
  }

  private runPublicRoleCreeps() {
    this.spawnCreepRoleHarvester(this.nameSpawn, this.properties);
    this.spawnCreepRoleUpgrader(this.nameSpawn, this.properties);
    this.spawnCreepRoleBuilder(this.nameSpawn, this.properties);
    this.spawnCreepRoleRefueller(this.nameSpawn, this.properties);
    this.spawnCreepRoleRepair(this.nameSpawn, this.properties);
    this.spawnCreepRoleAttack(this.nameSpawn, this.properties);
  }

  private runPrivateRoleCreeps() {
    this.spawnWorkingAbroadHarvester(
      "W38S57",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 2, level: 1 })
    );

    this.spawnWorkingAbroadUpgrader(
      "W38S57",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 2, level: 1 })
    );

    this.spawnWorkingAbroadHarvester(
      "W37S56",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 2, level: 1 })
    );

    this.spawnWorkingAbroadUpgrader(
      "W37S56",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 2, level: 1 })
    );

    // this.spawnWorkingAbroadAttack(
    //   "W37S56",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 2, level: 2 }),
    //   [
    //     [35, 26],
    //     [41, 33]
    //   ]
    // );
    //
    // this.spawnCreepRoleRanged("1", this.nameSpawn, this.properties, [34, 11]);
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

  public spawnCreepRoleRepair(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleRepair(nameSpawn, properties);
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

  public spawnCreepRoleRanged(
    suffixName: string,
    nameSpawn: string,
    properties: IProperties,
    parkingCoordinates: [number, number]
  ) {
    super.spawnCreepRoleRanged(suffixName, nameSpawn, properties, parkingCoordinates);
  }
}
