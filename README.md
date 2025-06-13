# Generated Website

This website was generated with database integration capabilities.

## Database Setup

This project uses **MongoDB Atlas Data API** for frontend-only database integration.

### MongoDB Atlas Setup (Required)

1. **Create a MongoDB Atlas Account**:
   - Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
   - Create a free account and cluster

2. **Enable Data API**:
   - In your Atlas project, go to "Data API" in the left sidebar
   - Click "Create API Key" or use existing
   - Copy your **App ID** and **API Key**

3. **Configure Environment Variables**:
   Edit your `.env` file with your Atlas credentials:
   ```env
   VITE_MONGODB_APP_ID=data-abcde     # Your Atlas App ID
   VITE_MONGODB_API_KEY=your-api-key  # Your Atlas API Key  
   VITE_DATABASE_NAME=myapp           # Your database name
   VITE_CLUSTER_NAME=Cluster0         # Your cluster name
   ```

4. **Test Connection**:
   - Start the app: `npm run dev`
   - Newsletter signup should work immediately
   - Data will be stored in your MongoDB Atlas cluster

### No Database Mode
If you don't want database functionality, simply leave the environment variables empty. The app will work without database features.

## Features

- **MongoDB Atlas Integration**: Frontend-only database connection
- **Newsletter integration**: Built-in newsletter signup with database storage
- **Modern UI**: Tailwind CSS with responsive design
- **Mobile-first**: Responsive design that works on all devices
- **Environment-based**: Easy configuration through environment variables
- **Frontend-only**: No backend server needed - deploy anywhere
- **Smart fallbacks**: Works without database configuration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   ```bash
   # Edit .env with your database configuration
   # For development, you can use the default values
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will run on http://localhost:5173

## Database Integration

The app includes several built-in hooks and services:

- `useDatabase<T>(collection)` - Generic database operations
- `useNewsletter()` - Newsletter subscription management
- `databaseService` - Direct database service access

### Example Usage

```tsx
import { useDatabase } from './hooks/useDatabase';
import { User } from './types/database';

function UserList() {
  const { data: users, loading, create } = useDatabase<User>('users');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {users.map(user => (
        <div key={user._id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_DATABASE_TYPE` | Database type to use | `mongodb` |
| `VITE_MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mydb` |
| `VITE_POSTGRES_URI` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/mydb` |
| `VITE_MYSQL_URI` | MySQL connection string | `mysql://user:pass@localhost:3306/mydb` |
| `VITE_DATABASE_NAME` | Database name | `my_app_database` |
| `VITE_API_BASE_URL` | API base URL | `http://localhost:3000/api` |

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.