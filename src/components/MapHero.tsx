'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X, MapPin, ArrowRight } from 'lucide-react';
import { Project } from '@/types';
import { formatPriceRange, getStatusLabel, getMarkerColor } from '@/lib/utils';

interface MapHeroProps {
  projects: Project[];
}

export default function MapHero({ projects }: MapHeroProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleMarkerClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = token;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-79.3832, 43.6532],
        zoom: 13,
        pitch: 55,
        bearing: -17.6,
        antialias: true,
      });

      mapRef.current = map;

      map.on('load', () => {
        // 3D building extrusions
        const layers = map.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
        )?.id;

        map.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 12,
            paint: {
              'fill-extrusion-color': '#1a1a3e',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.6,
            },
          },
          labelLayerId
        );

        // Add project markers
        projects.forEach((project) => {
          if (!project.latitude || !project.longitude) return;

          const color = getMarkerColor(project.status);

          const markerEl = document.createElement('div');
          markerEl.className = 'project-marker';
          markerEl.style.cssText = `
            width: 16px;
            height: 16px;
            background: ${color};
            border: 2px solid rgba(255,255,255,0.8);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 12px ${color}80, 0 0 24px ${color}40;
            transition: transform 0.2s;
          `;

          // Beam effect
          const beam = document.createElement('div');
          beam.style.cssText = `
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 20px;
            background: linear-gradient(to top, ${color}, transparent);
            pointer-events: none;
          `;
          markerEl.appendChild(beam);

          markerEl.addEventListener('mouseenter', () => {
            markerEl.style.transform = 'scale(1.3)';
          });
          markerEl.addEventListener('mouseleave', () => {
            markerEl.style.transform = 'scale(1)';
          });
          markerEl.addEventListener('click', () => {
            handleMarkerClick(project);
          });

          new mapboxgl.default.Marker({ element: markerEl })
            .setLngLat([project.longitude, project.latitude])
            .addTo(map);
        });

        // map loaded
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [projects, handleMarkerClick]);

  const projectCount = projects.length;
  const neighborhoodCount = new Set(projects.map((p) => p.neighborhood)).size;

  return (
    <div className="relative" style={{ height: '75vh' }}>
      {/* Map */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Fallback if no mapbox token */}
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a1a] flex items-center justify-center">
          <div className="text-center text-white/60">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-accent" />
            <p className="text-lg font-medium">3D Map View</p>
            <p className="text-sm">Add MAPBOX_TOKEN to enable the interactive map</p>
          </div>
        </div>
      )}

      {/* Glass info panel */}
      <div className="absolute bottom-20 left-6 z-10 max-w-sm">
        <div
          className="backdrop-blur-xl rounded-2xl p-5 border border-white/10"
          style={{ background: 'rgba(10, 10, 26, 0.75)' }}
        >
          <h1 className="text-white text-xl font-bold leading-tight mb-2">
            Toronto&apos;s Premier<br />Pre-Construction Marketplace
          </h1>
          <p className="text-white/60 text-sm mb-4">
            Explore new developments across the Greater Toronto Area
          </p>
          <div className="flex gap-4 text-white/80">
            <div>
              <div className="text-2xl font-bold text-accent">{projectCount}+</div>
              <div className="text-xs text-white/50">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{neighborhoodCount}+</div>
              <div className="text-xs text-white/50">Neighborhoods</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">$400K</div>
              <div className="text-xs text-white/50">Starting From</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className="backdrop-blur-xl rounded-xl p-3 border border-white/10 flex gap-3"
          style={{ background: 'rgba(10, 10, 26, 0.6)' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-[10px] text-white/60">Pre-Construction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="text-[10px] text-white/60">Under Construction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-[10px] text-white/60">Completed</span>
          </div>
        </div>
      </div>

      {/* Selected project card */}
      {selectedProject && (
        <div className="absolute top-4 left-6 z-20 w-80 animate-fade-in-up">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src={selectedProject.mainImageUrl}
                alt={selectedProject.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-primary">{selectedProject.name}</h3>
              <p className="text-sm text-muted mt-0.5">{selectedProject.neighborhood}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-accent">
                  {formatPriceRange(selectedProject.priceMin, selectedProject.priceMax)}
                </span>
                <span className="text-xs text-muted">
                  {selectedProject.floors}F &middot; {selectedProject.units} units
                </span>
              </div>
              <div className="text-xs text-muted mt-1">{getStatusLabel(selectedProject.status)}</div>
              <Link
                href={`/properties/${selectedProject.slug}`}
                className="mt-3 flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                View Listing <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Scroll chevron */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce-slow">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </div>
  );
}
