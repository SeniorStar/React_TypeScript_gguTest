export const formatSuccessResponse = (data: any) => ({
    success: true,
    data,
  });
  
  export const formatErrorResponse = (message: string, details?: string) => ({
    success: false,
    error: {
      message,
      details,
    },
  });
  