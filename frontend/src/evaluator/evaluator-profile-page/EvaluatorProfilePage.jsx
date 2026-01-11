// src/pages/evaluator/EvaluatorProfilePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  Building2,
  Briefcase,
  MapPin,
  Globe,
  FileText,
  Github,
  Youtube,
  Calendar,
  ShieldCheck,
  User
} from "lucide-react";

const EvaluatorProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("evaluatorToken");

        if (!token) {
          setError("Authentication token missing. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8088/api/evaluators/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setProfile(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to fetch evaluator profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
        ⚠️ {error}
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            Evaluator Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Professional & Verification Details
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-bold 
              ${profile.status === "Approved"
                ? "bg-green-100 text-green-700"
                : profile.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {profile.status}
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Top Section */}
        <div className="bg-gradient-to-r from-sky-950 to-sky-950 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-white/80">{profile.role}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Column 1 */}
          <div className="space-y-4">
            <ProfileItem icon={<Mail size={18} />} label="Email" value={profile.email} />
            <ProfileItem icon={<Phone size={18} />} label="Phone" value={profile.phone} />
            <ProfileItem icon={<Building2 size={18} />} label="Organization" value={profile.organization} />
            <ProfileItem icon={<Briefcase size={18} />} label="Department" value={profile.department} />
            <ProfileItem icon={<ShieldCheck size={18} />} label="Role" value={profile.role} />
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <ProfileItem
              icon={<MapPin size={18} />}
              label="Location"
              value={`${profile.city}, ${profile.state}`}
            />
            <ProfileItem icon={<Globe size={18} />} label="Country" value={profile.country} />
            <ProfileItem icon={<Calendar size={18} />} label="Joined On" value={new Date(profile.created_at).toLocaleDateString()} />
            {profile.github_profile_url && (
              <ProfileLink
                icon={<Github size={18} />}
                label="GitHub"
                url={profile.github_profile_url}
              />
            )}
            {profile.youtube_channel_url && (
              <ProfileLink
                icon={<Youtube size={18} />}
                label="YouTube"
                url={profile.youtube_channel_url}
              />
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="border-t bg-gray-50 p-6">
          <h3 className="font-bold text-slate-700 mb-4">
            Documents & Verification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {profile.resume_drive_url && (
              <DocumentLink
                label="Resume (Drive Link)"
                url={profile.resume_drive_url}
              />
            )}

            {profile.resume_file && (
              <DocumentLink
                label="Uploaded Resume"
                url={`http://localhost:8088/uploads/${profile.resume_file}`}
              />
            )}

            {profile.id_proof_image && (
              <DocumentLink
                label="ID Proof"
                url={`http://localhost:8088/uploads/${profile.id_proof_image}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- REUSABLE COMPONENTS ---------------- */

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-red-500">{icon}</div>
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-slate-800 font-semibold">{value || "-"}</p>
    </div>
  </div>
);

const ProfileLink = ({ icon, label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition"
  >
    <div className="text-red-500">{icon}</div>
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-blue-600 font-semibold truncate">{url}</p>
    </div>
  </a>
);

const DocumentLink = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-3 bg-white border rounded-lg p-4 hover:shadow-md transition"
  >
    <FileText className="text-red-500" size={22} />
    <div>
      <p className="font-semibold text-slate-800">{label}</p>
      <p className="text-blue-600 text-xs truncate">{url}</p>
    </div>
  </a>
);

export default EvaluatorProfilePage;
