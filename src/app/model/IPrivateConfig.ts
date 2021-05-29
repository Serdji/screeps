interface IPrivateConfig {
  LIMIT_HARVESTER: ILimitCreep;
  LIMIT_UPGRADER: ILimitCreep;
  LIMIT_BUILDER: ILimitCreep;
  LIMIT_REFUELLER: ILimitCreep;

  LIMIT_WORKING_ABROAD_UPGRADER?: ILimitCreep;
  LIMIT_WORKING_ABROAD_HARVESTER?: ILimitCreep;
  LIMIT_WORKING_ABROAD_ATTACK?: ILimitCreep;

  LIMIT_ATTACK: ILimitCreep;
  LIMIT_RANGED: ILimitCreep;

  PATROLLING_COORDINATES: [number, number][];
}
