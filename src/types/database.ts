// Database Configuration Types
export interface DatabaseConfig {
  type: 'mongodb' | 'postgres' | 'mysql' | 'none';
  uri: string;
  name: string;
}

// Common Database Entity Types
export interface BaseEntity {
  _id?: string;
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// User Entity
export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  isActive?: boolean;
}

// Newsletter Subscription Entity
export interface NewsletterSubscription extends BaseEntity {
  email: string;
  status: 'subscribed' | 'unsubscribed' | 'pending';
  source?: string;
  tags?: string[];
}

// Generic Collection Schema
export interface CollectionSchema {
  name: string;
  fields: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
}