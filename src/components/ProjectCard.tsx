import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { formatPriceRange } from '@/lib/utils';

function getStatusBadge(status: string) {
  switch (status) {
    case 'pre-construction':
      return { label: 'Pre-Construction', className: 'bg-primary text-white' };
    case 'under-construction':
      return { label: 'Under Construction', className: 'border border-copper text-copper' };
    case 'completed':
      return { label: 'Completed', className: 'bg-muted/20 text-muted' };
    case 'selling':
      return { label: 'Now Selling', className: 'bg-primary text-white' };
    default:
      return { label: status, className: 'bg-muted/20 text-muted' };
  }
}

export default function ProjectCard({ project }: { project: Project }) {
  const badge = getStatusBadge(project.status);

  return (
    <Link href={`/properties/${project.slug}`} className="group block">
      <div className="transition-all duration-500 ease-luxury hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={project.mainImageUrl}
            alt={`${project.name} - ${project.neighborhood}`}
            fill
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className={`${badge.className} px-3 py-1 text-meta uppercase inline-block`}>
              {badge.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-4 pb-2">
          <span className="text-label uppercase text-muted">
            {project.neighborhood}
          </span>
          <h3 className="font-serif text-card-title text-primary mt-1 group-hover:text-copper transition-colors duration-300">
            {project.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-light text-primary">
              {formatPriceRange(project.priceMin, project.priceMax)}
            </span>
            <span className="text-label uppercase text-muted">
              {project.developer}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
