'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { Project } from '@/types';
import { formatPriceRange } from '@/lib/utils';

interface MapHeroProps {
  projects: Project[];
  embedded?: boolean;
}

function createCirclePoly(lng: number, lat: number, radiusMeters: number, sides = 32): number[][] {
  const coords: number[][] = [];
  const earthRadius = 6378137;
  for (let i = 0; i <= sides; i++) {
    const angle = (i / sides) * 2 * Math.PI;
    const dx = radiusMeters * Math.cos(angle);
    const dy = radiusMeters * Math.sin(angle);
    const newLat = lat + (dy / earthRadius) * (180 / Math.PI);
    const newLng = lng + (dx / (earthRadius * Math.cos((lat * Math.PI) / 180))) * (180 / Math.PI);
    coords.push([newLng, newLat]);
  }
  return coords;
}

function getStatusColorHex(status: string): string {
  switch (status) {
    case 'pre-construction': return '#0066FF';
    case 'under-construction': return '#10B981';
    case 'completed': return '#F59E0B';
    case 'selling': return '#8B5CF6';
    default: return '#0066FF';
  }
}

export default function MapHero({ projects, embedded = false }: MapHeroProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mapInteractive, setMapInteractive] = useState(false);

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
        scrollZoom: false,
      });

      mapRef.current = map;

      // Click-to-enable scroll zoom
      const container = mapContainer.current!;
      const handleMapClick = () => {
        if (!mapInteractive) {
          map.scrollZoom.enable();
          setMapInteractive(true);
        }
      };
      container.addEventListener('click', handleMapClick);

      // Disable scroll zoom when mouse leaves
      const handleMouseLeave = () => {
        map.scrollZoom.disable();
        setMapInteractive(false);
      };
      container.addEventListener('mouseleave', handleMouseLeave);

      map.on('load', () => {
        // ── 3D building extrusions from composite source ──
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
              'fill-extrusion-color': [
                'interpolate', ['linear'], ['get', 'height'],
                0, '#16181e',
                100, '#1e2030',
                200, '#2a2d42',
                400, '#353850',
              ],
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.7,
            },
          },
          labelLayerId
        );

        // ── GeoJSON source for project columns ──
        const columnFeatures = projects
          .filter((p) => p.latitude && p.longitude)
          .map((project) => ({
            type: 'Feature' as const,
            properties: {
              id: project.id,
              slug: project.slug,
              name: project.name,
              status: project.status,
              color: getStatusColorHex(project.status),
              floors: project.floors || 20,
              height: (project.floors || 20) * 3.5,
              glowHeight: (project.floors || 20) * 3.8,
            },
            geometry: {
              type: 'Polygon' as const,
              coordinates: [createCirclePoly(project.longitude, project.latitude, 15)],
            },
          }));

        const dotFeatures = projects
          .filter((p) => p.latitude && p.longitude)
          .map((project) => ({
            type: 'Feature' as const,
            properties: {
              id: project.id,
              slug: project.slug,
              name: project.name,
              status: project.status,
              color: getStatusColorHex(project.status),
            },
            geometry: {
              type: 'Point' as const,
              coordinates: [project.longitude, project.latitude],
            },
          }));

        map.addSource('project-columns', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: columnFeatures },
        });

        map.addSource('project-dots', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: dotFeatures },
        });

        // ── Column glow (outer, transparent) ──
        map.addLayer({
          id: 'column-glow',
          type: 'fill-extrusion',
          source: 'project-columns',
          paint: {
            'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': ['get', 'glowHeight'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.15,
          },
        });

        // ── Column markers (main) ──
        map.addLayer({
          id: 'column-markers',
          type: 'fill-extrusion',
          source: 'project-columns',
          paint: {
            'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.85,
          },
        });

        // ── Ground glow dots ──
        map.addLayer({
          id: 'glow-dots',
          type: 'circle',
          source: 'project-dots',
          paint: {
            'circle-color': ['get', 'color'],
            'circle-radius': [
              'interpolate', ['linear'], ['zoom'],
              10, 3,
              14, 7,
              18, 14,
            ],
            'circle-blur': 1,
            'circle-opacity': 0.6,
          },
        });

        // ── Solid center dots ──
        map.addLayer({
          id: 'center-dots',
          type: 'circle',
          source: 'project-dots',
          paint: {
            'circle-color': ['get', 'color'],
            'circle-radius': [
              'interpolate', ['linear'], ['zoom'],
              10, 2,
              14, 4,
              18, 7,
            ],
            'circle-blur': 0,
            'circle-opacity': 1,
            'circle-stroke-width': 1,
            'circle-stroke-color': 'rgba(255,255,255,0.6)',
          },
        });

        // ── Hover: change cursor, highlight ──
        map.on('mouseenter', 'column-markers', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'column-markers', () => {
          map.getCanvas().style.cursor = '';
        });
        map.on('mouseenter', 'center-dots', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'center-dots', () => {
          map.getCanvas().style.cursor = '';
        });

        // ── Click: show property card ──
        const handleLayerClick = (e: mapboxgl.MapLayerMouseEvent) => {
          const feature = e.features?.[0];
          if (!feature) return;
          const slug = feature.properties?.slug;
          const project = projects.find((p) => p.slug === slug);
          if (project) {
            handleMarkerClick(project);
            map.flyTo({
              center: [project.longitude, project.latitude],
              zoom: 15,
              pitch: 55,
              duration: 800,
            });
          }
        };

        map.on('click', 'column-markers', handleLayerClick);
        map.on('click', 'center-dots', handleLayerClick);

        // ── Tooltip on hover ──
        const popup = new mapboxgl.default.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 10,
          className: 'map-tooltip',
        });

        map.on('mousemove', 'center-dots', (e) => {
          const feature = e.features?.[0];
          if (!feature) return;
          const props = feature.properties;
          const coords = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
          const project = projects.find((p) => p.slug === props?.slug);
          if (!project) return;

          popup
            .setLngLat(coords)
            .setHTML(`
              <div style="background:#1a1a2e;color:white;padding:8px 12px;border-radius:8px;font-size:12px;border:1px solid rgba(255,255,255,0.1);min-width:140px;">
                <div style="font-weight:600;margin-bottom:2px;">${project.name}</div>
                <div style="color:rgba(255,255,255,0.6);font-size:10px;">${project.neighborhood} · ${project.floors || '?'}F</div>
                <div style="color:${getStatusColorHex(project.status)};font-weight:600;margin-top:4px;">From $${project.priceMin ? (project.priceMin / 1000).toFixed(0) + 'K' : 'TBA'}</div>
              </div>
            `)
            .addTo(map);
        });

        map.on('mouseleave', 'center-dots', () => {
          popup.remove();
        });
      });

      return () => {
        container.removeEventListener('click', handleMapClick);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [projects, handleMarkerClick, mapInteractive]);

  const projectCount = projects.length;
  const neighborhoodCount = new Set(projects.map((p) => p.neighborhood)).size;

  return (
    <div className="relative h-full">
      {/* Map */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Fallback if no mapbox token */}
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 bg-surface-dark flex items-center justify-center">
          <div className="text-center text-white/40">
            <MapPin className="w-10 h-10 mx-auto mb-3" strokeWidth={1} />
            <p className="text-sm font-light">Add MAPBOX_TOKEN to enable the interactive map</p>
          </div>
        </div>
      )}

      {/* Info panel — only when not embedded (standalone hero) */}
      {!embedded && (
        <div className="absolute bottom-16 left-6 z-10 max-w-sm">
          <div
            className="backdrop-blur-xl p-5 border border-white/10"
            style={{ background: 'rgba(10, 10, 26, 0.75)' }}
          >
            <h2 className="text-white font-serif text-2xl leading-tight mb-2">
              Pre-Construction<br />Developments
            </h2>
            <p className="text-white/50 text-sm font-light mb-4">
              {projectCount} projects across {neighborhoodCount} neighborhoods
            </p>
            <div className="flex gap-6 text-white/70">
              <div>
                <div className="text-xl font-serif text-white">{projectCount}+</div>
                <div className="text-meta uppercase text-white/40">Projects</div>
              </div>
              <div>
                <div className="text-xl font-serif text-white">{neighborhoodCount}+</div>
                <div className="text-meta uppercase text-white/40">Areas</div>
              </div>
              <div>
                <div className="text-xl font-serif text-white">$400K</div>
                <div className="text-meta uppercase text-white/40">From</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className="backdrop-blur-xl p-3 border border-white/10 flex gap-4"
          style={{ background: 'rgba(10, 10, 26, 0.5)' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#0066FF' }} />
            <span className="text-meta text-white/50">Pre-Construction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
            <span className="text-meta text-white/50">Under Construction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
            <span className="text-meta text-white/50">Completed</span>
          </div>
        </div>
      </div>

      {/* Selected project card */}
      {selectedProject && (
        <div className="absolute top-4 left-6 z-20 w-80 animate-fade-in-up">
          <div className="bg-white shadow-card-hover overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src={selectedProject.mainImageUrl}
                alt={selectedProject.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <span className="text-meta uppercase text-muted">{selectedProject.neighborhood}</span>
              <h3 className="font-serif text-lg text-primary mt-1">{selectedProject.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-primary">
                  {formatPriceRange(selectedProject.priceMin, selectedProject.priceMax)}
                </span>
                <span className="text-meta uppercase text-muted">
                  {selectedProject.floors}F &middot; {selectedProject.units} units
                </span>
              </div>
              <Link
                href={`/properties/${selectedProject.slug}`}
                className="mt-3 flex items-center gap-1 text-sm text-copper hover:text-primary transition-colors duration-300"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator — only on standalone hero */}
      {!embedded && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
          <span className="text-meta uppercase text-white/30 tracking-widest">Scroll</span>
        </div>
      )}
    </div>
  );
}
