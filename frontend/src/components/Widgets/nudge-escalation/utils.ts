export const getLevelColor = (level: string) => {
  switch (level) {
    case 'low':
      return 'bg-blue-500/10 text-blue-500';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'high':
      return 'bg-orange-500/10 text-orange-500';
    case 'critical':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};
