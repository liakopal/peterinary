// ErrorLogger.js
export const logError = (error, info = null) => {
    // Log to the console
    console.error('Logged Error:', error);
  
    // If you have an external logging service, you can send the error there as well
    // sendErrorToService(error, info);
  };
  
  // You can then use this in a component with an error boundary or directly in try-catch blocks
  