import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';

import { Job } from './Job';
import { UserJob } from './UserJob';

@Table({
  timestamps: false,
  tableName: 'users'
})
export class User extends Model {
  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  role!: string;

  @BelongsToMany(() => Job, () => UserJob)
  jobs?: Job[];
}
