// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must log in first!');
      window.location.href = '/';
      return;
    }

    setRole(savedRole);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to Maven Dashboard</h2>
      <p><strong>Role:</strong> {role}</p>

      {role === 'freelancer' && (
        <>
          <button onClick={() => window.location.href = '/jobs'}>View Jobs</button>
          <button onClick={() => window.location.href = '/applications'}>
  My Applications
</button>

        </>
      )}

      {role === 'employer' && (
        <>
          <button onClick={() => window.location.href = '/post-job'}>Post a Job</button>
          <button onClick={() => alert('Coming soon: View Applicants')}>View Applicants</button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
