import React from "react";
import { useState, useEffect } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://www.arbeitnow.com/api/job-board-api")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setJobs(data.data || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading jobs…</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 shadow-lg">
      <ul role="list" className="divide-y divide-gray-100">
        {jobs.map((job, idx) => (
          <li
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-4 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex flex-auto flex-col">
              <p className="text-base font-semibold text-gray-900">
                {job.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">{job.company_name}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
            {job.remote && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                Remote
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
