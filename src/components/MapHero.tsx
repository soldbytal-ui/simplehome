'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X, MapPin, ArrowRight } from 'lucide-react';
import { Project } from '@/types';
import { formatPriceRange, getStatusLabel } from '@/lib/utils';

interface MapHeroProps {
  projects: Project[];
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

export default function MapHero({ projects }: MapHeroProps) {
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
    <div className="relative" style={{ height: '75vh' }}>
      {/* Map */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Click-to-zoom hint */}
      {!mapInteractive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 transition-opacity duration-500" id="scroll-hint">
        </div>
      )}

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
