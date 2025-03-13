'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface HealthData {
  status?: string;
  components?: {
    ping?: { status: string };
    db?: { status: string; details?: { database?: string } };
    elasticsearch?: { status: string };
    mongo?: { status: string };
  };
}

const HealthPage: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [kibanaStatus, setKibanaStatus] = useState<string | null>(null);
  const [frontendStatus, setFrontendStatus] = useState<string | null>(null);
  const [keycloakStatus, setKeycloakStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get('/actuator/health');
        setHealthData(response.data);
      } catch (error: any) {
        if (error.response) {
          setHealthData(error.response.data);
        } else {
          setHealthData({ status: 'DOWN' });
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchKibanaStatus = async () => {
      try {
        const response = await axios.get('/kibana/api/status');
        setKibanaStatus(response.status === 200 ? 'available' : 'unavailable');
      } catch {
        setKibanaStatus('unavailable');
      }
    };

    const fetchFrontendStatus = async () => {
      try {
        const response = await axios.get<{ status: string }>('/health-check');
        setFrontendStatus(response.data.status);
      } catch (error: any) {
        setFrontendStatus(error.response?.data?.status || 'DOWN');
      }
    };

    const fetchKeycloakStatus = async () => {
      try {
        const response = await axios.get('/keycloak/health');
        setKeycloakStatus(response.status === 200 ? 'UP' : 'DOWN');
      } catch {
        setKeycloakStatus('DOWN');
      }
    };

    fetchHealthData();
    fetchKibanaStatus();
    fetchFrontendStatus();
    fetchKeycloakStatus();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  const isUp = healthData?.components?.ping?.status === 'UP';
  const dbLabel = healthData?.components?.db?.details?.database;
  const isDbUp = healthData?.components?.db?.status === 'UP';
  const isEsUp = healthData?.components?.elasticsearch?.status === 'UP';
  const isMongoUp = healthData?.components?.mongo?.status === 'UP';
  const isKibanaUp = kibanaStatus === 'available';
  const isFrontendUp = frontendStatus === 'running';
  const isKeycloakUp = keycloakStatus === 'UP';

  const StatusRow = ({
    label,
    href,
    isUp,
  }: {
    label: string;
    href: string;
    isUp: boolean;
  }) => (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-all">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm sm:text-base font-medium"
      >
        {label}
      </a>
      {isUp ? (
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full ml-2" />
      ) : (
        <span className="text-red-500 text-lg">❌</span>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Services Status
      </h2>
      <StatusRow
        label="SpringBoot Application (Port 5010)"
        href="http://localhost:5010"
        isUp={isUp}
      />
      {dbLabel && (
        <StatusRow
          label={`${dbLabel} (Port 3306)`}
          href="http://localhost:3306"
          isUp={isDbUp}
        />
      )}
      <StatusRow
        label="Elasticsearch (Port 9200)"
        href="http://localhost:9200"
        isUp={isEsUp}
      />
      <StatusRow
        label="MongoDB (Port 27017)"
        href="http://localhost:27017"
        isUp={isMongoUp}
      />
      <StatusRow
        label="Kibana (Port 5601)"
        href="http://localhost:5601"
        isUp={isKibanaUp}
      />
      <StatusRow
        label="Frontend Application (Port 3003)"
        href="http://localhost:3003"
        isUp={isFrontendUp}
      />
      <StatusRow
        label="Keycloak (Port 8080)"
        href="http://localhost:8080"
        isUp={isKeycloakUp}
      />
    </div>
  );
};

export default HealthPage;
