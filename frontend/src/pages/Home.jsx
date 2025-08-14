// src/pages/Home.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import orgController from "../controllers/orgController";

export default function Home() {
  const { org, loading, error, load } = orgController();

  useEffect(() => {
    load(); // fetch /orgs/me/
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-900">
        <div className="bg-gray-900 p-6 rounded-md shadow-lg w-[800px]">
          <p className="text-gray-300">Loading organization...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-900">
        <div className="bg-gray-900 p-6 rounded-md shadow-lg w-[800px]">
          <p className="text-red-400">{error}</p>
          <Link to="/login" className="text-blue-400 underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  const orgName = org?.name 
  const orgEmail = org?.email 

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-gray-900 p-6 rounded-md shadow-lg w-[800px] flex flex-col">
        {/* Org Info */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-200">{orgName}</h1>
            <p className="text-sm text-gray-400">{orgEmail}</p>
          </div>
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        </div>

        {/* Content Area */}
        <div className="flex flex-row gap-4">
          {/* Text editor */}
          <div className="flex flex-col flex-1">
            <label className="text-gray-400 mb-1">Text Editor Icons</label>
            <textarea
              className="bg-gray-800 text-gray-200 rounded-md p-2 resize-none h-48"
              placeholder="Start Writing..."
            />
            <div className="flex gap-4 mt-2">
              <button className="bg-blue-700 text-white py-1 px-3 rounded hover:bg-blue-600">
                Create Event
              </button>
              <button className="bg-blue-700 text-white py-1 px-3 rounded hover:bg-blue-600">
                Send Email
              </button>
            </div>
          </div>

          {/* Sidebar Buttons */}
          <div className="flex flex-col gap-3 w-32">
            <Link
              to="/events"
              className="bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-600"
            >
              Events
            </Link>
            <button className="bg-blue-700 text-white py-2 rounded hover:bg-blue-600">
              QR Code
            </button>
            <Link
              to="/members"
              className="bg-blue-700 text-white text-center py-2 rounded hover:bg-blue-600"
            >
              Members
            </Link>
            <button className="bg-blue-700 text-white py-2 rounded hover:bg-blue-600">
              Analytics
            </button>
            <button className="bg-blue-700 text-white py-2 rounded hover:bg-blue-600">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
