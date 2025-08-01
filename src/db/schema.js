import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'chats',
      columns: [
        { name: 'remote_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'last_message', type: 'string', isOptional: true },
        { name: 'last_message_at', type: 'number', isOptional: true },
        { name: 'unread_count', type: 'number' },
        { name: 'avatar_url', type: 'string', isOptional: true },
        { name: 'other_party_id', type: 'string', isOptional: true, isIndexed: true },
        { name: 'is_pinned', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'users',
      columns: [
        { name: 'remote_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'user_name', type: 'string', isOptional: true },
        { name: 'phone_number', type: 'string', isOptional: true },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'avatar_url', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'last_active_time', type: 'string', isOptional: true },
        { name: 'views', type: 'number', isOptional: true },
        { name: 'likes', type: 'number', isOptional: true },
        { name: 'followed', type: 'boolean', isOptional: true },
        { name: 'created_date', type: 'number', isOptional: true },
      ],
    }),
  ],
});