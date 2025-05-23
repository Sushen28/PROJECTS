import React, { useEffect, useState } from 'react';
import API from '../services/api';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get('/jobs/applied', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to load applications:", err);
        alert("Unable to fetch applied jobs.");
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Applications</h2>
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <ul>
          {applications.map(job => (
            <li key={job.id}>
              <strong>{job.title}</strong><br />
              {job.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyApplications;
