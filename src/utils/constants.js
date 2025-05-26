// API URL and other constants
export const API_URL = 'http://localhost:3001/api/v1'; // Default to development URL

// Authentication
export const TOKEN_STORAGE_KEY = 'zoobase_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'zoobase_refresh_token';

// Socket events
export const SOCKET_EVENTS = {
  ANIMAL_UPDATED: 'animal:updated',
  ANIMAL_ALERT: 'animal:alert',
  MEDICAL_UPDATED: 'medical:updated',
  HABITAT_UPDATED: 'habitat:environmental:updated',
  OBSERVATION_CREATED: 'observation:created',
  TASK_ASSIGNED: 'task:assigned',
  TASK_STATUS_CHANGED: 'task:status',
  USER_VIEWING: 'user:viewing',
  USER_EDITING: 'user:editing',
  USER_COMMENTED: 'user:commented',
  USER_PRESENCE: 'user:presence'
};

// Animal status constants
export const ANIMAL_STATUS = {
  HEALTHY: 'healthy',
  OBSERVATION: 'medical observation',
  CRITICAL: 'critical',
  QUARANTINE: 'quarantine',
  TREATMENT: 'under treatment',
  DECEASED: 'deceased',
  TRANSFERRED: 'transferred',
};

// Task status constants
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Task priority constants
export const TASK_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Notification priority constants
export const NOTIFICATION_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  ZOOKEEPER: 'zookeeper',
  VETERINARIAN: 'veterinarian',
  RESEARCHER: 'researcher',
  MANAGER: 'manager',
};

// Permissions mapping
export const PERMISSIONS = {
  ANIMAL_READ: 'animal:read',
  ANIMAL_CREATE: 'animal:create',
  ANIMAL_UPDATE: 'animal:update',
  ANIMAL_DELETE: 'animal:delete',
  
  MEDICAL_READ: 'medical:read',
  MEDICAL_CREATE: 'medical:create',
  MEDICAL_UPDATE: 'medical:update',
  
  OBSERVATION_READ: 'observation:read',
  OBSERVATION_CREATE: 'observation:create',
  
  HABITAT_READ: 'habitat:read',
  HABITAT_UPDATE: 'habitat:update',
  
  TASK_READ: 'task:read',
  TASK_CREATE: 'task:create',
  TASK_UPDATE: 'task:update',
  TASK_ASSIGN: 'task:assign',
  
  USER_READ: 'user:read',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
};

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: Object.values(PERMISSIONS),
  
  [USER_ROLES.ZOOKEEPER]: [
    PERMISSIONS.ANIMAL_READ,
    PERMISSIONS.ANIMAL_UPDATE,
    PERMISSIONS.MEDICAL_READ,
    PERMISSIONS.OBSERVATION_READ,
    PERMISSIONS.OBSERVATION_CREATE,
    PERMISSIONS.HABITAT_READ,
    PERMISSIONS.TASK_READ,
    PERMISSIONS.TASK_UPDATE,
  ],
  
  [USER_ROLES.VETERINARIAN]: [
    PERMISSIONS.ANIMAL_READ,
    PERMISSIONS.ANIMAL_UPDATE,
    PERMISSIONS.MEDICAL_READ,
    PERMISSIONS.MEDICAL_CREATE,
    PERMISSIONS.MEDICAL_UPDATE,
    PERMISSIONS.OBSERVATION_READ,
    PERMISSIONS.OBSERVATION_CREATE,
    PERMISSIONS.TASK_READ,
    PERMISSIONS.TASK_UPDATE,
  ],
  
  [USER_ROLES.RESEARCHER]: [
    PERMISSIONS.ANIMAL_READ,
    PERMISSIONS.OBSERVATION_READ,
    PERMISSIONS.OBSERVATION_CREATE,
    PERMISSIONS.HABITAT_READ,
  ],
  
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.ANIMAL_READ,
    PERMISSIONS.MEDICAL_READ,
    PERMISSIONS.OBSERVATION_READ,
    PERMISSIONS.HABITAT_READ,
    PERMISSIONS.TASK_READ,
    PERMISSIONS.TASK_CREATE,
    PERMISSIONS.TASK_UPDATE,
    PERMISSIONS.TASK_ASSIGN,
    PERMISSIONS.USER_READ,
  ],
};

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  SERVER_ERROR: 'An unexpected server error occurred',
  VALIDATION_ERROR: 'Please check your input data',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SESSION_EXPIRED: 'Your session has expired. Please log in again',
};