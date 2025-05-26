import React from 'react';

/**
 * TasksPanel - Component displaying task list and progress
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tasks - Array of task objects to display
 * @param {Function} props.onTaskAction - Callback when a task action is taken
 */
const TasksPanel = ({ tasks = [], onTaskAction }) => {
  // Example default tasks if none are provided
  const defaultTasks = [
    {
      id: 't1',
      title: 'Lion Health Checkups',
      dueDate: '2023-05-20',
      status: 'In Progress',
      priority: 'high',
      assignee: 'Dr. Sarah Johnson',
      completed: false,
      progress: 30,
    },
    {
      id: 't2',
      title: 'Update Feeding Schedule',
      dueDate: '2023-05-18',
      status: 'Not Started',
      priority: 'normal',
      assignee: 'Mike Reynolds',
      completed: false,
      progress: 0,
    },
    {
      id: 't3',
      title: 'Aquarium Maintenance',
      dueDate: '2023-05-16',
      status: 'In Progress',
      priority: 'high',
      assignee: 'Lisa Chen',
      completed: false,
      progress: 75,
    },
    {
      id: 't4',
      title: 'Monthly Inventory Check',
      dueDate: '2023-05-22',
      status: 'Not Started',
      priority: 'normal',
      assignee: 'James Wilson',
      completed: false,
      progress: 0,
    },
    {
      id: 't5',
      title: 'Staff Training Session',
      dueDate: '2023-05-25',
      status: 'Scheduled',
      priority: 'low',
      assignee: 'Emma Rodriguez',
      completed: false,
      progress: 10,
    },
  ];

  // Use provided tasks or fall back to defaults
  const displayTasks = tasks.length > 0 ? tasks : defaultTasks;

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate days left until due date
  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper to get priority badge style
  const getPriorityBadgeStyle = (priority) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper to get progress bar color based on progress and days left
  const getProgressBarColor = (progress, dueDate) => {
    const daysLeft = getDaysLeft(dueDate);
    
    if (progress >= 75) return 'bg-green-500';
    if (progress < 25 && daysLeft <= 2) return 'bg-red-500';
    if (progress < 50 && daysLeft <= 5) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-800">Pending Tasks</h3>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
          onClick={() => console.log('View all tasks clicked')}
        >
          <span>View all</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {displayTasks.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {displayTasks.map((task) => {
              const daysLeft = getDaysLeft(task.dueDate);
              const isOverdue = daysLeft < 0;
              const progressBarColor = getProgressBarColor(task.progress, task.dueDate);
              
              return (
                <li key={task.id} className="px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <input 
                        type="checkbox" 
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={task.completed}
                        onChange={() => onTaskAction && onTaskAction(task.id, 'toggle')}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Assigned to: {task.assignee}
                          </p>
                        </div>
                        <span 
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeStyle(task.priority)}`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1 dark:bg-gray-700">
                        <div 
                          className={`${progressBarColor} h-1.5 rounded-full`} 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-3">
                          <button 
                            className="text-xs font-medium text-blue-600 hover:text-blue-800"
                            onClick={() => onTaskAction && onTaskAction(task.id, 'view')}
                          >
                            View
                          </button>
                          <button 
                            className="text-xs font-medium text-gray-600 hover:text-gray-800"
                            onClick={() => onTaskAction && onTaskAction(task.id, 'edit')}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-3 h-3 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                          </svg>
                          <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                            {isOverdue ? 
                              `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}` : 
                              `Due ${formatDate(task.dueDate)}`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="py-8 px-5 text-center">
            <p className="text-gray-500">No tasks to display</p>
          </div>
        )}
      </div>
      
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <button 
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => onTaskAction && onTaskAction('new', 'create')}
        >
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default TasksPanel;
