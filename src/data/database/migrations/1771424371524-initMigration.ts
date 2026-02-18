import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitMigration1771424371524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Session',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'currentPhaseName', type: 'varchar' },
                { name: 'state', type: 'varchar' },
                { name: 'deviceTokens', type: 'jsonb' },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
            ]
        }))
        await queryRunner.createTable(new Table({
            name: 'Phase',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'sessionId', type: 'uuid' },
                { name: 'name', type: 'varchar' },
                { name: 'description', type: 'text' },
                { name: 'mikaPoints', type: 'int' },
                { name: 'catPoints', type: 'int' },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
            ],
            foreignKeys: [
                {
                    name: 'FK_Phase_Session',
                    columnNames: ['sessionId'],
                    referencedTableName: 'Session',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            ]
        }))
        await queryRunner.createTable(new Table({
            name: 'Notification',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'sessionId', type: 'uuid' },
                { name: 'phaseId', type: 'uuid' },
                { name: 'type', type: 'varchar' },
                { name: 'isRead', type: 'boolean', default: false },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
            ],
            foreignKeys: [
                {
                    name: 'FK_Notification_Session',
                    columnNames: ['sessionId'],
                    referencedTableName: 'Session',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    name: 'FK_Notification_Phase',
                    columnNames: ['phaseId'],
                    referencedTableName: 'Phase',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
