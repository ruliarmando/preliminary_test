import { Table, Column, Model, BelongsToMany, AllowNull } from 'sequelize-typescript';

import { User } from './User';
import { UserJob } from './UserJob';

@Table({
  timestamps: false,
  tableName: 'jobs'
})
export class Job extends Model {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  dayOfWeek!: string;

  @AllowNull(false)
  @Column
  start!: string;

  @AllowNull(false)
  @Column
  end!: string;

  @BelongsToMany(() => User, () => UserJob)
  users?: User[];
}
