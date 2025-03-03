import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthPage.css';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const isUp = healthData?.components?.ping?.status === 'UP';
  const dbLabel = healthData?.components?.db?.details?.database;
  const isDbUp = healthData?.components?.db?.status === 'UP';
  const isEsUp = healthData?.components?.elasticsearch?.status === 'UP';
  const isMongoUp = healthData?.components?.mongo?.status === 'UP';
  const isKibanaUp = kibanaStatus === 'available';
  const isFrontendUp = frontendStatus === 'running';
  const isKeycloakUp = keycloakStatus === 'UP';

  return (
    <div>
      <h1>Health Page</h1>
      <div className="health-status">
        <a href="http://localhost:5010" className="status-label">
          SpringBoot application (Port 5010)
        </a>
        {isUp ? (
          <span className="status-up-rect"></span>
        ) : (
          <span className="status-down">❌</span>
        )}
      </div>
      {dbLabel && (
        <div className="health-status">
          <a href="http://localhost:3306" className="status-label">
            {dbLabel} (Port 3306)
          </a>
          {isDbUp ? (
            <span className="status-up-rect"></span>
          ) : (
            <span className="status-down">❌</span>
          )}
        </div>
      )}
      <div className="health-status">
        <a href="http://localhost:9200" className="status-label">
          ElasticSearch (Port 9200)
        </a>
        {isEsUp ? (
          <span className="status-up-rect"></span>
        ) : (
          <span className="status-down">❌</span>
        )}
      </div>
      <div className="health-status">
        <a href="http://localhost:27017" className="status-label">
          MongoDB (Port 27017)
        </a>
        {isMongoUp ? (
          <span className="status-up-rect"></span>
        ) : (
          <span className="status-down">❌</span>
        )}
      </div>
      <div className="health-status">
        <a href="http://localhost:5601" className="status-label">
          Kibana (Port 5601)
        </a>
        {isKibanaUp ? (
          <span className="status-up-rect"></span>
        ) : (
          <span className="status-down">❌</span>
        )}
      </div>
      <div className="health-status">
        <a href="http://localhost:3003" className="status-label">
          Frontend Application (Port 3003)
        </a>
        {isFrontendUp ? (
          <span className="status-up-rect"></span>
        ) : (
          <span className="status-down">❌</span>
        )}
      </div>
      <div className="health-status">
        <a href="http://localhost:8080" className="status-label">
          Keycloak (Port 8080)
        </a>
        {isKeycloakUp ? (
          <span className="status-up-rect"></span>
        ) : (
          <span className="status-down">❌</span>
        )}
      </div>
    </div>
  );
};

export default HealthPage;
