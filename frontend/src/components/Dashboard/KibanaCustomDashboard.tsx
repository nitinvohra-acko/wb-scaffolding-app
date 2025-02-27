'use client';
import React, { useState, useEffect } from 'react';
import './KibanaCustomDashboard.css'; // Import the CSS file
import { Box, Button, Chip, Typography } from '@mui/material';

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
    <Box mb={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        border="none"
      >
        <Box>
          <Typography variant="h6">{visibleSection} Dashboards</Typography>
          <Box>
            {filteredDashboards.map((dashboard) => (
              <Button
                key={dashboard.id}
                onClick={() => handleClick(dashboard.id)}
                variant="contained"
                color={dashboard.id === selectedId ? 'primary' : 'inherit'}
                sx={{ mr: 2, my: 2, boxShadow: 1 }}
              >
                {dashboard.attributes.title}
              </Button>
            ))}
          </Box>
        </Box>
        <Box sx={{ '&>div': { mx: 1, minWidth: '60px' } }}>
          {['Admin', 'UnderWriter', 'Doctor', 'All'].map((role) => (
            <Chip
              key={role}
              label={role}
              className={visibleSection === role ? 'active' : ''}
              onClick={() => handleSectionClick(role)}
              sx={{
                background:
                  visibleSection === role ? 'rgb(239, 233, 251)' : 'default',
                color: visibleSection === role ? '#752cff' : 'default',
                fontWeight: visibleSection === role ? '600' : '400',
              }}
              variant="filled"
            />
          ))}
        </Box>
      </Box>
      {selectedId && (
        <iframe
          src={`http://localhost:5601/app/dashboards#/view/${selectedId}?embed=true&_g=()`}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        ></iframe>
      )}
    </Box>
  );
};

export default KibanaCustomDashboard;
