import { Platform } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import { migrations } from './migrations';
import Chat from './models/Chat';
import User from './models/User';
import { SESSION_ID } from '../api/config';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  migrations,
  dbName: `panco_${SESSION_ID}`,
  jsi: true,
  onSetUpError: error => {
    console.error('Failed to setup database', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Chat, User],
});