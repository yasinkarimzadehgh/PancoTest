import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @text('remote_id') remoteId;
  @text('name') name;
  @text('user_name') userName;
  @text('phone_number') phoneNumber;
  @text('description') description;
  @text('avatar_url') avatarUrl;
  @field('followers') followers;
  @field('following') following;

  @text('last_active_time') lastActiveTime;
  @field('views') views;
  @field('likes') likes;
  @field('followed') followed;
  @field('created_date') createdDate;

  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}