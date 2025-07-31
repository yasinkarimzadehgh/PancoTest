import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Chat extends Model {
  static table = 'chats';

  @text('remote_id') remoteId;
  @text('name') name;
  @text('last_message') lastMessage;
  @date('last_message_at') lastMessageAt;
  @field('unread_count') unreadCount;
  @text('avatar_url') avatarUrl;
  @text('other_party_id') otherPartyId;
  @field('is_pinned') isPinned;

  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}