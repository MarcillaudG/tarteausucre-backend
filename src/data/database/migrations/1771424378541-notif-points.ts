import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class NotifPointsMigration1771424378541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('Notification', new TableColumn({
            name: 'catPoints',
            type: 'int',
            isNullable: true
        }))
        await queryRunner.addColumn('Notification', new TableColumn({
            name: 'mikaPoints',
            type: 'int',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
