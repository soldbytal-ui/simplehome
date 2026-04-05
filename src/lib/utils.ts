export function formatPrice(price: number | null): string {
  if (!price) return 'TBA';
  if (price >= 1000000) {
    const m = price / 1000000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`;
  }
  return `$${price.toLocaleString()}`;
}

export function formatPriceRange(min: number | null, max: number | null): string {
  if (!min && !max) return 'TBA';
  if (min && max) return `${formatPrice(min)} - ${formatPrice(max)}`;
  if (min) return `From ${formatPrice(min)}`;
  return `Up to ${formatPrice(max)}`;
}

export function formatPriceFull(price: number | null): string {
  if (!price) return 'TBA';
  return `$${price.toLocaleString()}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pre-construction': return 'bg-accent text-white';
    case 'under-construction': return 'bg-orange-500 text-white';
    case 'completed': return 'bg-secondary text-white';
    case 'selling': return 'bg-purple-500 text-white';
    default: return 'bg-muted text-white';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'pre-construction': return 'Pre-Construction';
    case 'under-construction': return 'Under Construction';
    case 'completed': return 'Completed';
    case 'selling': return 'Now Selling';
    default: return status;
  }
}

export function getMarkerColor(status: string): string {
  switch (status) {
    case 'pre-construction': return '#0066FF';
    case 'under-construction': return '#10B981';
    case 'completed': return '#F59E0B';
    case 'selling': return '#8B5CF6';
    default: return '#0066FF';
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function readingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
