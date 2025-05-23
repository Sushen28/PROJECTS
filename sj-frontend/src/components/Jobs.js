// src/components/Jobs.js
import React, { useEffect, useState } from 'react';
import API from '../services/api'; // Already exists

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('token'); // Auth token

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        alert("Failed to load jobs");
      }
    };

    fetchJobs();
  }, []);

  const applyToJob = async (jobId) => {
    try {
      const res = await API.post(
        `/jobs/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message || 'Successfully applied!');
    } catch (error) {
      console.error('Job apply error:', error);
      alert('Failed to apply. ' + (error.response?.data?.error || ''));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job.id} style={{ marginBottom: '1rem' }}>
              <strong>{job.title}</strong><br />
              {job.description}<br />
              <button onClick={() => applyToJob(job.id)}>Apply</button>
            </li>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </ul>
    </div>
  );
}

export default Jobs;
