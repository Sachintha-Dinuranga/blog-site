#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/90e813969c0189b2631643f22e37f7f567b8241bd12e36a5f07cfc6e90a15f26/contract';
import endContract from '../../snapshots/90e813969c0189b2631643f22e37f7f567b8241bd12e36a5f07cfc6e90a15f26/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'tag_type',
        members: ['Tech', 'Programming', 'Tutorial'],
      }),
      this.createTable({
        schema: 'public',
        table: 'comments',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('post_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updated_at', 'timestamptz', {
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'comments_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'posts',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'uuid', {
            notNull: true,
            default: fn(sql`gen_random_uuid()`),
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('tag', '"tag_type"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'tag_type' } },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'posts_pkey' })],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'comments',
        foreignKey: {
          name: 'comments_post_id_fkey',
          columns: ['post_id'],
          references: { schema: 'public', table: 'posts', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
