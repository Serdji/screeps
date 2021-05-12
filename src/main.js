const CreepRoleHarvester = require('CreepRoleHarvester');
const CreepRoleUpgrader = require('CreepRoleUpgrader');
const CreepRoleBuilder = require('CreepRoleBuilder');
const CreepRoleMultiRoom = require('CreepRoleMultiRoom');

const CreepRoleAttack = require('CreepRoleAttack');

const TowerControl = require('TowerControl');

const {
    ROLE_HARVESTER,
    ROLE_BUILDER,
    ROLE_UPGRADER,
    ROLE_ATTACK,
    ROLE_MULTI_ROOM,
} = require('properties');

module.exports.loop = function () {
    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Помер крипт и удален из памяти:', name);
        }
    }



    const creepRoleHarvester = new CreepRoleHarvester();
    const creepRoleUpgrader = new CreepRoleUpgrader();
    const creepRoleBuilder = new CreepRoleBuilder();
    const creepRoleMultiRoom_W7N3 = new CreepRoleMultiRoom('W7N3');
    const creepRoleMultiRoom_W8N2 = new CreepRoleMultiRoom('W8N2');

    const creepRoleAttack = new CreepRoleAttack();

    const towerControl = new TowerControl();

    creepRoleHarvester.spawn();
    creepRoleUpgrader.spawn();
    creepRoleBuilder.spawn();
    creepRoleMultiRoom_W7N3.spawn();
    creepRoleMultiRoom_W8N2.spawn();

    creepRoleAttack.spawn();

    towerControl.run();

    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        switch ( creep.memory.role ) {
            case ROLE_HARVESTER: creepRoleHarvester.run(creep); break;
            case ROLE_UPGRADER: creepRoleUpgrader.run(creep); break;
            case ROLE_BUILDER: creepRoleBuilder.run(creep); break;
            case ROLE_MULTI_ROOM + 'W7N3': creepRoleMultiRoom_W7N3.run(creep); break;
            case ROLE_MULTI_ROOM + 'W8N2': creepRoleMultiRoom_W8N2.run(creep); break;
            case ROLE_ATTACK: creepRoleAttack.run(creep); break;
        }
    }
}
