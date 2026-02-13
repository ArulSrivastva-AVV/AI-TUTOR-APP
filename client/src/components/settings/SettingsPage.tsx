import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  MessageSquare,
  ShoppingBag,
  Award,
  Calendar,
  Gift,
  MessageCircle,
  HelpCircle,
  Settings as SettingsIcon,
  Sun,
  Moon,
  LogOut,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";

type SettingsTab =
  | "personal"
  | "noticeboard"
  | "orders"
  | "scholarship"
  | "leaves"
  | "refer"
  | "feedback"
  | "support"
  | "settings";

interface SettingsPageProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  onLogout: () => void;
}

export function SettingsPage({
  theme,
  toggleTheme,
  onLogout,
}: SettingsPageProps) {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("settings");

  const sidebarItems = [
    {
      id: "personal",
      label: "Personal details",
      icon: <User size={20} />,
    },
    {
      id: "noticeboard",
      label: "Noticeboard",
      icon: <MessageSquare size={20} />,
    },
    {
      id: "orders",
      label: "Order details",
      icon: <ShoppingBag size={20} />,
    },
    {
      id: "scholarship",
      label: "Scholarship",
      icon: <Award size={20} />,
      badge: "NEW",
    },
    {
      id: "leaves",
      label: "My leaves",
      icon: <Calendar size={20} />,
    },
    {
      id: "refer",
      label: "Refer a Friend",
      icon: <Gift size={20} />,
      badge: "NEW",
    },
    {
      id: "feedback",
      label: "Technical Feedback",
      icon: <MessageCircle size={20} />,
    },
    {
      id: "support",
      label: "Help & support",
      icon: <HelpCircle size={20} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon size={20} />,
    },
  ];

  return (
    <div className="flex h-full gap-6">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0 flex flex-col gap-6">
        <h2 className="text-2xl font-bold px-4">
          Your profile
        </h2>

        {/* Theme Toggle Card */}
        <div
          className={`p-4 rounded-2xl flex items-center justify-between ${
            theme === "light"
              ? "bg-white shadow-sm"
              : "bg-slate-800 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Site Theme
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">
              {theme === "light" ? "Light" : "Dark"}
            </span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setActiveTab(item.id as SettingsTab)
              }
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? theme === "light"
                    ? "bg-white shadow-md text-slate-900 font-semibold" // Active Light
                    : "bg-slate-800 shadow-md text-white font-semibold" // Active Dark
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50" // Inactive
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={
                    activeTab === item.id
                      ? "text-indigo-500"
                      : "text-slate-400"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className="bg-amber-400 text-amber-900 hover:bg-amber-500 border-none"
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 rounded-3xl p-8 overflow-y-auto ${
          theme === "light"
            ? "bg-white shadow-sm"
            : "bg-slate-800 shadow-sm"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === "settings" ? (
              <AccountSettings
                theme={theme}
                onLogout={onLogout}
              />
            ) : activeTab === "personal" ? (
              <PersonalDetails theme={theme} />
            ) : (
              <PlaceholderContent
                title={
                  sidebarItems.find((i) => i.id === activeTab)
                    ?.label || ""
                }
                theme={theme}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AccountSettings({
  theme,
  onLogout,
}: {
  theme: "light" | "dark";
  onLogout: () => void;
}) {
  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="text-3xl font-normal text-slate-800 dark:text-slate-100">
        Account Settings
      </h2>

      <div className="space-y-6">
        <div className="space-y-1">
          <button
            onClick={onLogout}
            className="text-lg font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-2"
          >
            Log out of all devices
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You will be logged out of all active sessions
            immediately.
          </p>
        </div>

        <div className="space-y-1">
          <button className="text-lg font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-2">
            Discontinue studying with Acharya
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pause your learning journey temporarily. You can
            resume anytime.
          </p>
        </div>

        <div className="space-y-1">
          <button className="text-lg font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors flex items-center gap-2">
            Delete account
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Permanently remove your data and progress. This
            action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
}

function PersonalDetails({
  theme,
}: {
  theme: "light" | "dark";
}) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-normal text-slate-800 dark:text-slate-100">
          Personal Details
        </h2>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Full Name
          </label>
          <div
            className={`p-3 rounded-lg border ${
              theme === "light"
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            Rohit Sharma
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Student ID
          </label>
          <div
            className={`p-3 rounded-lg border ${
              theme === "light"
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            ACH-2024-8821
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Email Address
          </label>
          <div
            className={`p-3 rounded-lg border ${
              theme === "light"
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            rahul.sharma@example.com
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Phone Number
          </label>
          <div
            className={`p-3 rounded-lg border ${
              theme === "light"
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            +91 98765 43210
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Date of Birth
          </label>
          <div
            className={`p-3 rounded-lg border ${
              theme === "light"
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            15 August 2002
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Target Exam
          </label>
          <div
            className={`p-3 rounded-lg border ${
              theme === "light"
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-900 border-slate-700"
            }`}
          >
            JEE Advanced 2025
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderContent({
  title,
  theme,
}: {
  title: string;
  theme: "light" | "dark";
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
      <div
        className={`p-6 rounded-full ${
          theme === "light" ? "bg-slate-50" : "bg-slate-700"
        }`}
      >
        <SettingsIcon
          size={48}
          className="text-slate-300 dark:text-slate-500 opacity-50"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2">
          This section is currently under development. Check
          back soon for updates to your {title.toLowerCase()}.
        </p>
      </div>
    </div>
  );
}