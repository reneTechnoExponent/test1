import { useState, useEffect, useCallback } from 'react';
import { databaseService } from '../services/databaseService';
import { BaseEntity } from '../types/database';

// Hook for database operations
export function useDatabase<T extends BaseEntity>(collection: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all items
  const fetchAll = useCallback(async (query?: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const items = await databaseService.findMany<T>(collection, query);
      setData(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [collection]);

  // Create new item
  const create = useCallback(async (itemData: Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const newItem = await databaseService.create<T>(collection, itemData);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collection]);

  // Update item
  const update = useCallback(async (id: string, itemData: Partial<T>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedItem = await databaseService.update<T>(collection, id, itemData);
      setData(prev => prev.map(item => 
        (item._id === id || item.id === id) ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collection]);

  // Delete item
  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await databaseService.delete(collection, id);
      if (success) {
        setData(prev => prev.filter(item => item._id !== id && item.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collection]);

  // Initial load
  useEffect(() => {
    if (databaseService.isConfigured()) {
      fetchAll();
    }
  }, [fetchAll]);

  return {
    data,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    isConfigured: databaseService.isConfigured(),
  };
}

// Hook specifically for newsletter subscriptions
export function useNewsletter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subscribe = useCallback(async (email: string, source?: string, tags?: string[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await databaseService.subscribeToNewsletter(email, source, tags);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe to newsletter');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    subscribe,
    loading,
    error,
    success,
    reset,
    isConfigured: databaseService.isConfigured(),
  };
}