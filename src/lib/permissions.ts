export function canCreateResume(totalCount: number) {
  return totalCount < 4; // Allow 4 free resumes for all users
} 