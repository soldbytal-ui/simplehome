import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Building2, Calendar } from 'lucide-react';
import { Project } from '@/types';
import { formatPriceRange, getStatusColor, getStatusLabel } from '@/lib/utils';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/properties/${project.slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.mainImageUrl}
            alt={`${project.name} - Pre-Construction in ${project.neighborhood}, Toronto`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className={`${getStatusColor(project.status)} px-2.5 py-1 rounded-full text-xs font-medium`}>
              {getStatusLabel(project.status)}
            </span>
          </div>
          {project.completionYear && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-primary">
              {project.completionYear}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-primary text-lg leading-tight group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-muted text-sm">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{project.neighborhood}</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold text-accent">
              {formatPriceRange(project.priceMin, project.priceMax)}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted">
              {project.floors && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {project.floors}F
                </span>
              )}
              {project.units && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.units} units
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-muted mt-2 line-clamp-2">{project.description}</p>

          <div className="mt-3 pt-3 border-t border-black/[0.06] flex items-center justify-between">
            <span className="text-xs text-muted">{project.developer}</span>
            <span className="text-xs font-medium text-accent capitalize">{project.buildingType}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
