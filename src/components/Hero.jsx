import React, { useState, useEffect } from "react";
import { BackgroundBoxesDemo } from "./ui/BackgroundBoxesDemo";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch("https://www.arbeitnow.com/api/job-board-api")
      .then((res) => res.json())
      .then((data) => {
        const jobList = data.data || data;
        setJobs(jobList);
        setFilteredJobs(jobList);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const titleMatch = job.title
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const locationMatch = job.location
        .toLowerCase()
        .includes(location.toLowerCase());
      return titleMatch && locationMatch;
    });

    setFilteredJobs(filtered);
  }, [keyword, location, jobs]);

  return (
    <div className="hero min-h-screen flex flex-col justify-center">
      <BackgroundBoxesDemo />

      <main className=" p-4">
        <h1 className="text-4xl font-bold mb-4 mt-10 text-center">
          Finden Sie Ihre nächste Chance mit{" "}
          <span className="text-emerald-500">JobHunt</span>
        </h1>
        <p className="max-w-xl mx-auto mb-8">
          Entdecken Sie Tausende von Jobs, die auf Ihre Fähigkeiten, Erfahrungen
          und Karriereziele zugeschnitten sind.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Developer"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 p-3 border rounded"
          />
        </div>

        {loading && <p>Loading jobs…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100 ">
            {filteredJobs.map((job, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-4 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-auto flex-col">
                  <p className="text-base font-semibold text-gray-900">
                    {job.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {job.company_name}
                  </p>
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
      </main>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                <button
                  className="text-2xl text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedJob(null)}
                >
                  &times;
                </button>
              </div>

              {/* Company + Location */}
              <p className="text-sm text-gray-600 mb-2">
                {selectedJob.company_name} — {selectedJob.location}
              </p>

              {/* Remote Tag */}
              {selectedJob.remote && (
                <p className="text-xs text-blue-600 mb-2">Remote Friendly</p>
              )}

              {/* Description */}
              <div
                className="text-sm text-gray-700 leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedJob.description || "No description available.",
                }}
              />

              {/* Link to Full Posting */}
              {selectedJob.url && (
                <a
                  href={selectedJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-emerald-600 hover:underline text-sm"
                >
                  View full job posting →
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
