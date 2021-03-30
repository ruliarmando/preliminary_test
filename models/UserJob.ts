import { Model, Column, Table, ForeignKey, AllowNull } from "sequelize-typescript";

import { User } from './User';
import { Job } from './Job';

@Table({
  timestamps: false,
  tableName: 'user_jobs'
})
export class UserJob extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @ForeignKey(() => Job)
  @AllowNull(false)
  @Column
  jobId!: number;
}
