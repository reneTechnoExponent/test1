import { DatabaseConfig, BaseEntity } from '../types/database';

// MongoDB Atlas Data API Configuration
interface AtlasConfig {
  appId: string;
  apiKey: string;
  clusterName: string;
  databaseName: string;
}

// Database Configuration
const getAtlasConfig = (): AtlasConfig => {
  return {
    appId: import.meta.env.VITE_MONGODB_APP_ID || '',
    apiKey: import.meta.env.VITE_MONGODB_API_KEY || '',
    clusterName: import.meta.env.VITE_CLUSTER_NAME || '',
    databaseName: import.meta.env.VITE_DATABASE_NAME || 'app_database'
  };
};

// MongoDB Atlas Data API Service
class DatabaseService {
  private config: AtlasConfig;
  private baseUrl: string;

  constructor() {
    this.config = getAtlasConfig();
    this.baseUrl = `https://data.mongodb-api.com/app/${this.config.appId}/endpoint/data/v1/action`;
  }

  // Check if Atlas Data API is configured
  isConfigured(): boolean {
    return !!(this.config.appId && this.config.apiKey && this.config.clusterName && this.config.databaseName);
  }

  // Get database configuration
  getConfig(): AtlasConfig {
    return this.config;
  }

  // Atlas Data API request helper
  private async makeAtlasRequest(action: string, payload: any): Promise<any> {
    if (!this.isConfigured()) {
      const missingVars = [];
      if (!this.config.appId) missingVars.push('VITE_MONGODB_APP_ID');
      if (!this.config.apiKey) missingVars.push('VITE_MONGODB_API_KEY');
      if (!this.config.clusterName) missingVars.push('VITE_CLUSTER_NAME');
      if (!this.config.databaseName) missingVars.push('VITE_DATABASE_NAME');
      
      throw new Error(`MongoDB Atlas Data API not configured. Missing environment variables: ${missingVars.join(', ')}`);
    }

    const requestUrl = `${this.baseUrl}/${action}`;
    const requestBody = {
      dataSource: this.config.clusterName,
      database: this.config.databaseName,
      ...payload,
    };

    console.log('Atlas API Request:', {
      url: requestUrl,
      action,
      dataSource: this.config.clusterName,
      database: this.config.databaseName,
      hasApiKey: !!this.config.apiKey,
      appId: this.config.appId
    });

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.config.apiKey,
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Atlas API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Atlas API Error Response:', errorText);
        throw new Error(`Atlas API error (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      console.log('Atlas API Success:', result);
      return result;
    } catch (error) {
      console.error('Atlas API request failed:', {
        error: error.message,
        url: requestUrl,
        config: {
          appId: this.config.appId,
          hasApiKey: !!this.config.apiKey,
          clusterName: this.config.clusterName,
          databaseName: this.config.databaseName
        }
      });
      
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Network error: Could not connect to MongoDB Atlas Data API. Please check your internet connection and Atlas configuration.');
      }
      
      throw error;
    }
  }

  // Generic CRUD Operations using Atlas Data API
  async create<T extends BaseEntity>(collection: string, data: Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      const document = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await this.makeAtlasRequest('insertOne', {
        collection,
        document,
      });

      return {
        _id: result.insertedId,
        ...document,
      } as T;
    } catch (error) {
      console.error(`Error creating ${collection}:`, error);
      throw error;
    }
  }

  async findMany<T extends BaseEntity>(collection: string, filter: Record<string, any> = {}): Promise<T[]> {
    if (!this.isConfigured()) {
      return []; // Return empty array if not configured
    }

    try {
      const result = await this.makeAtlasRequest('find', {
        collection,
        filter,
        sort: { createdAt: -1 },
        limit: 100, // Reasonable default limit
      });

      return result.documents || [];
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error);
      return []; // Return empty array on error
    }
  }

  async findById<T extends BaseEntity>(collection: string, id: string): Promise<T | null> {
    if (!this.isConfigured()) {
      return null;
    }

    try {
      const result = await this.makeAtlasRequest('findOne', {
        collection,
        filter: { _id: { $oid: id } },
      });

      return result.document || null;
    } catch (error) {
      console.error(`Error fetching ${collection} by ID:`, error);
      return null;
    }
  }

  async update<T extends BaseEntity>(collection: string, id: string, data: Partial<T>): Promise<T> {
    try {
      const updateData = {
        ...data,
        updatedAt: new Date(),
      };

      const result = await this.makeAtlasRequest('updateOne', {
        collection,
        filter: { _id: { $oid: id } },
        update: { $set: updateData },
      });

      if (result.modifiedCount === 0) {
        throw new Error('Document not found or not modified');
      }

      // Return the updated document
      return await this.findById<T>(collection, id) as T;
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      throw error;
    }
  }

  async delete(collection: string, id: string): Promise<boolean> {
    try {
      const result = await this.makeAtlasRequest('deleteOne', {
        collection,
        filter: { _id: { $oid: id } },
      });

      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting ${collection}:`, error);
      return false;
    }
  }

  // Newsletter-specific methods
  async subscribeToNewsletter(email: string, source?: string, tags?: string[]): Promise<any> {
    // Check if email already exists
    const existing = await this.findMany('newsletter_subscriptions', { email });
    if (existing.length > 0) {
      throw new Error('Email already subscribed');
    }

    return this.create('newsletter_subscriptions', {
      email,
      status: 'subscribed' as const,
      source: source || 'website',
      tags: tags || [],
    });
  }

  async getNewsletterSubscriptions(): Promise<any[]> {
    return this.findMany('newsletter_subscriptions');
  }

  // User-specific methods
  async createUser(userData: { email: string; name: string; avatar?: string }): Promise<any> {
    // Check if user already exists
    const existing = await this.findMany('users', { email: userData.email });
    if (existing.length > 0) {
      throw new Error('User with this email already exists');
    }

    return this.create('users', {
      ...userData,
      isActive: true,
    });
  }

  async getUsers(): Promise<any[]> {
    return this.findMany('users');
  }

  async getUserByEmail(email: string): Promise<any | null> {
    const users = await this.findMany('users', { email });
    return users.length > 0 ? users[0] : null;
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.makeAtlasRequest('find', {
        collection: 'test',
        filter: {},
        limit: 1,
      });
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export { DatabaseService };