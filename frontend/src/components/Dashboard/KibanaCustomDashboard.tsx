'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TagMap {
  [key: string]: string;
}

interface Dashboard {
  id: string;
  attributes: {
    title: string;
  };
  references?: { type: string; id: string }[];
}

const KibanaCustomDashboard: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [visibleSection, setVisibleSection] = useState<string>('All');
  const [tagMap, setTagMap] = useState<TagMap>({});
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [filteredDashboards, setFilteredDashboards] = useState<Dashboard[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          'http://localhost:5601/api/saved_objects/_find?type=tag',
          {
            headers: {
              'kbn-xsrf': 'true',
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        const tags = data.saved_objects;
        const map: TagMap = {};
        tags.forEach((tag: any) => {
          map[tag.attributes.name] = tag.id;
        });
        setTagMap(map);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    const fetchDashboards = async () => {
      try {
        const response = await fetch(
          'http://localhost:5601/api/saved_objects/_find?type=dashboard',
          {
            headers: {
              'kbn-xsrf': 'true',
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        setDashboards(data.saved_objects);
        setFilteredDashboards(data.saved_objects);
      } catch (error) {
        console.error('Error fetching dashboards:', error);
      }
    };

    fetchTags();
    fetchDashboards();
  }, []);

  const handleSectionClick = (section: string) => {
    setVisibleSection(section);
    setSelectedId('');
    if (section === 'All') {
      setFilteredDashboards(dashboards);
    } else {
      const tagId = tagMap[section];
      const filtered = dashboards.filter((dashboard) =>
        dashboard.references?.some(
          (ref) => ref.type === 'tag' && ref.id === tagId,
        ),
      );
      setFilteredDashboards(filtered);
    }
  };

  const handleClick = (id: string) => {
    setSelectedId(id);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{visibleSection} Dashboards</h2>
          <div className="flex flex-wrap gap-3">
            {filteredDashboards.map((dashboard) => (
              <Button
                key={dashboard.id}
                variant={selectedId === dashboard.id ? 'default' : 'outline'}
                onClick={() => handleClick(dashboard.id)}
                className="shadow-sm"
              >
                {dashboard.attributes.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 min-w-[200px] justify-end">
          {['Admin', 'UnderWriter', 'Doctor', 'All'].map((role) => (
            <Badge
              key={role}
              onClick={() => handleSectionClick(role)}
              className={`cursor-pointer px-3 py-1 rounded-md text-sm transition-colors ${
                visibleSection === role
                  ? 'bg-violet-100 text-violet-700 font-semibold'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              variant="secondary"
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {selectedId && (
        <iframe
          src={`http://localhost:5601/app/dashboards#/view/${selectedId}?embed=true&_g=()`}
          width="100%"
          height="600px"
          className="border-none"
        />
      )}
    </div>
  );
};

export default KibanaCustomDashboard;
