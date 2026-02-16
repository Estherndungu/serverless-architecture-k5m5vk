import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Cell,
  Area,
} from "recharts";
import {
  Search,
  ChevronDown,
  Download,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  X,
  ChevronRight,
  Filter,
} from "lucide-react";

// Paste this entire file into src/AnomalyDetectionDashboard.jsx
// Then render it from App.jsx:  <AnomalyDetectionDashboard />

function ReliabilityDashboard() {
  const [selectedRole, setSelectedRole] = useState("Leadership");
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedBuild, setSelectedBuild] = useState("26090");
  const [channel, setChannel] = useState("Retail");
  const [region, setRegion] = useState("All");
  const [onlyRegressions, setOnlyRegressions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Hardware");
  const [rcaDrawerOpen, setRcaDrawerOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Mock Data
  const kpiData = {
    headFailures: { value: 1847, change: -12.3, trend: "down" },
    persistentFailureRate: { value: 2.4, change: 8.7, trend: "up" },
    transientSpikeIndex: { value: 156, change: -5.2, trend: "down" },
    longTailLoad: { value: 892, change: 15.4, trend: "up" },
    mttr: { value: 4.2, change: -18.6, trend: "down" },
    autoTriageCoverage: { value: 87.3, change: 3.2, trend: "up" },
    falsePositiveRate: { value: 1.8, change: -0.5, trend: "down" },
    userImpactScore: { value: 6.7, change: 4.1, trend: "up" },
    reliabilityHealthIndex: { value: 82.5, change: -2.3, trend: "down" },
  };

  const persistentFailuresData = [
    {
      oem: "Dell",
      count: 234,
      signature: "DRIVER_IRQL_NOT_LESS",
      driver: "nvlddmkm.sys",
    },
    {
      oem: "HP",
      count: 189,
      signature: "PAGE_FAULT_IN_NONPAGED",
      driver: "storport.sys",
    },
    {
      oem: "Lenovo",
      count: 156,
      signature: "SYSTEM_SERVICE_EXCEPTION",
      driver: "win32kfull.sys",
    },
    {
      oem: "ASUS",
      count: 142,
      signature: "DPC_WATCHDOG_VIOLATION",
      driver: "ntoskrnl.exe",
    },
    {
      oem: "Acer",
      count: 98,
      signature: "MEMORY_MANAGEMENT",
      driver: "hal.dll",
    },
  ];

  const transientTrendData = [
    { time: "00:00", failures: 45, region: "US-West" },
    { time: "04:00", failures: 38, region: "US-West" },
    { time: "08:00", failures: 156, region: "EU-Central" },
    { time: "12:00", failures: 142, region: "EU-Central" },
    { time: "16:00", failures: 67, region: "APAC" },
    { time: "20:00", failures: 52, region: "US-East" },
  ];

  const headFailuresData = [
    {
      signature: "DRIVER_IRQL_NOT_LESS_OR_EQUAL",
      volume: 847,
      impact: "Critical",
      confidence: 94,
      regression: true,
      driver: "nvlddmkm.sys",
    },
    {
      signature: "PAGE_FAULT_IN_NONPAGED_AREA",
      volume: 623,
      impact: "High",
      confidence: 89,
      regression: false,
      driver: "storport.sys",
    },
    {
      signature: "SYSTEM_SERVICE_EXCEPTION",
      volume: 512,
      impact: "High",
      confidence: 92,
      regression: true,
      driver: "win32kfull.sys",
    },
    {
      signature: "DPC_WATCHDOG_VIOLATION",
      volume: 389,
      impact: "Medium",
      confidence: 87,
      regression: false,
      driver: "ntoskrnl.exe",
    },
    {
      signature: "MEMORY_MANAGEMENT",
      volume: 267,
      impact: "Medium",
      confidence: 85,
      regression: true,
      driver: "hal.dll",
    },
  ];

  const longTailData = [
    { group: "NVIDIA Drivers", count: 234, avgImpact: 3.2 },
    { group: "Intel Firmware", count: 189, avgImpact: 2.8 },
    { group: "AMD Processors", count: 156, avgImpact: 4.1 },
    { group: "Storage Drivers", count: 142, avgImpact: 3.7 },
    { group: "Network Adapters", count: 98, avgImpact: 2.3 },
    { group: "Audio Devices", count: 73, avgImpact: 1.9 },
  ];

  const spikeTrendData = [
    { date: "Jan 15", copilot: 45, gaming: 32, enterprise: 28 },
    { date: "Jan 22", copilot: 48, gaming: 35, enterprise: 30 },
    { date: "Jan 29", copilot: 52, gaming: 38, enterprise: 31 },
    { date: "Feb 05", copilot: 127, gaming: 89, enterprise: 67 },
    { date: "Feb 12", copilot: 134, gaming: 92, enterprise: 71 },
  ];

  const releaseImpactData = [
    { driver: "Display", previous: 45, current: 78, change: 73.3 },
    { driver: "Storage", previous: 32, current: 28, change: -12.5 },
    { driver: "Network", previous: 28, current: 52, change: 85.7 },
    { driver: "Audio", previous: 15, current: 12, change: -20.0 },
  ];

  const recoveryData = [
    { cohort: "Gaming", day1: 45, day3: 28, day7: 12 },
    { cohort: "Enterprise", day1: 38, day3: 15, day7: 5 },
    { cohort: "Copilot", day1: 52, day3: 42, day7: 38 },
    { cohort: "Retail", day1: 41, day3: 23, day7: 8 },
  ];

  const rootCauseDistribution = [
    { cause: "Deployments", percentage: 34, count: 156 },
    { cause: "Release Impact", percentage: 28, count: 128 },
    { cause: "Data Quality", percentage: 18, count: 82 },
    { cause: "Traffic Spikes", percentage: 12, count: 55 },
    { cause: "3rd Party Deps", percentage: 8, count: 37 },
  ];

  const hardwareCohortData = [
    { model: "Dell XPS 15", failureRate: 3.2, normalized: 2.8 },
    { model: "HP Spectre", failureRate: 2.7, normalized: 2.4 },
    { model: "Lenovo ThinkPad", failureRate: 1.9, normalized: 1.7 },
    { model: "ASUS ROG", failureRate: 4.1, normalized: 3.5 },
    { model: "Surface Laptop", failureRate: 1.2, normalized: 1.1 },
  ];

  const buildCohortData = [
    { build: "26085", failures: 2.8, delta: 0 },
    { build: "26087", failures: 3.1, delta: 10.7 },
    { build: "26090", failures: 3.6, delta: 28.6 },
    { build: "26092", failures: 3.3, delta: 17.9 },
  ];

  const usageScenarioData = [
    { scenario: "Gaming", normal: 145, degraded: 45, critical: 12 },
    { scenario: "Productivity", normal: 234, degraded: 32, critical: 8 },
    { scenario: "Media", normal: 189, degraded: 28, critical: 5 },
    { scenario: "Development", normal: 156, degraded: 38, critical: 15 },
  ];

  const geographyData = [
    { region: "US-West", commercial: 234, gaming: 145, msftOwned: 67 },
    { region: "US-East", commercial: 189, gaming: 123, msftOwned: 52 },
    { region: "EU-Central", commercial: 312, gaming: 98, msftOwned: 89 },
    { region: "APAC", commercial: 267, gaming: 167, msftOwned: 45 },
  ];

  const growingAnomaliesData = [
    { week: "W1", count: 12, projection: 15 },
    { week: "W2", count: 18, projection: 22 },
    { week: "W3", count: 28, projection: 35 },
    { week: "W4", count: 42, projection: 52 },
  ];

  const newSignaturesData = [
    {
      signature: "KERNEL_SECURITY_CHECK_FAILURE",
      firstSeen: "2d ago",
      growth: [2, 5, 12, 28, 45],
    },
    {
      signature: "UNEXPECTED_STORE_EXCEPTION",
      firstSeen: "5d ago",
      growth: [1, 3, 8, 15, 22],
    },
    {
      signature: "CRITICAL_PROCESS_DIED",
      firstSeen: "1d ago",
      growth: [5, 12, 18],
    },
  ];

  const rareCaseSpreadData = [
    { week: "W1", copilot: 2, retail: 1, enterprise: 0 },
    { week: "W2", copilot: 5, retail: 3, enterprise: 1 },
    { week: "W3", copilot: 12, retail: 8, enterprise: 4 },
    { week: "W4", copilot: 28, retail: 18, enterprise: 12 },
  ];

  const silentFailuresData = [
    { date: "Jan 15", silent: 12, index: 2.3 },
    { date: "Jan 22", silent: 18, index: 3.1 },
    { date: "Jan 29", silent: 24, index: 3.8 },
    { date: "Feb 05", silent: 35, index: 5.2 },
    { date: "Feb 12", silent: 48, index: 6.7 },
  ];

  const affectedCohortsData = [
    {
      cohort: "Copilot Users",
      churnSignal: 8.7,
      degradation: "High",
      devices: 12400,
    },
    {
      cohort: "Gaming Enthusiasts",
      churnSignal: 6.3,
      degradation: "Medium",
      devices: 8900,
    },
    {
      cohort: "Enterprise CAD",
      churnSignal: 4.2,
      degradation: "Medium",
      devices: 5600,
    },
    {
      cohort: "Surface Pro Users",
      churnSignal: 2.8,
      degradation: "Low",
      devices: 3200,
    },
  ];

  const fixEffectivenessData = {
    successRate: 78.5,
    beforeAfter: [
      { metric: "Crash Rate", before: 4.2, after: 1.8 },
      { metric: "MTTR", before: 6.5, after: 3.2 },
      { metric: "User Impact", before: 8.7, after: 3.1 },
    ],
    repeatReduction: [
      { week: "W-4", repeats: 45 },
      { week: "W-3", repeats: 38 },
      { week: "W-2", repeats: 28 },
      { week: "W-1", repeats: 15 },
      { week: "W0", repeats: 8 },
    ],
    devicesProtected: 284567,
    cumulativeProtection: [
      { day: "Day 1", count: 12400 },
      { day: "Day 3", count: 45600 },
      { day: "Day 7", count: 128900 },
      { day: "Day 14", count: 219300 },
      { day: "Day 28", count: 284567 },
    ],
  };

  const triageTableData = [
    {
      id: 1,
      signature: "DRIVER_IRQL_NOT_LESS",
      driver: "nvlddmkm.sys",
      severity: "Critical",
      impact: 847,
      regression: true,
      confidence: 94,
      cohort: "Gaming",
      rootCause: "Driver update 535.98",
      status: "Investigating",
    },
    {
      id: 2,
      signature: "PAGE_FAULT_IN_NONPAGED",
      driver: "storport.sys",
      severity: "High",
      impact: 623,
      regression: false,
      confidence: 89,
      cohort: "Enterprise",
      rootCause: "Firmware mismatch",
      status: "Fix Deployed",
    },
    {
      id: 3,
      signature: "SYSTEM_SERVICE_EXCEPTION",
      driver: "win32kfull.sys",
      severity: "High",
      impact: 512,
      regression: true,
      confidence: 92,
      cohort: "Copilot",
      rootCause: "Build 26090 regression",
      status: "RCA Complete",
    },
    {
      id: 4,
      signature: "DPC_WATCHDOG_VIOLATION",
      driver: "ntoskrnl.exe",
      severity: "Medium",
      impact: 389,
      regression: false,
      confidence: 87,
      cohort: "Retail",
      rootCause: "Async I/O timeout",
      status: "Monitoring",
    },
    {
      id: 5,
      signature: "MEMORY_MANAGEMENT",
      driver: "hal.dll",
      severity: "Medium",
      impact: 267,
      regression: true,
      confidence: 85,
      cohort: "Gaming",
      rootCause: "Memory pool corruption",
      status: "Fix In Progress",
    },
  ];

  const aiInsights = [
    {
      type: "alert",
      title: "Critical Spike Detected",
      message:
        "Gaming cohort showing 3.2x failure increase in last 24h. Correlation with NVIDIA driver 535.98 rollout detected.",
    },
    {
      type: "suggestion",
      title: "RCA Hypothesis",
      message:
        "Build 26090 introduced regression in win32kfull.sys affecting Copilot scenarios. Suggest immediate rollback evaluation.",
    },
    {
      type: "warning",
      title: "At-Risk Cohort",
      message:
        "Enterprise CAD users showing silent degradation pattern. Recommend proactive communication.",
    },
    {
      type: "insight",
      title: "Recovery Pattern",
      message:
        "Fixes deployed 48h ago show 78.5% effectiveness. Gaming cohort recovering slower than expected.",
    },
  ];

  const roleContent = {
    Leadership: {
      whySoWhat: {
        why: "Reliability Health Index decreased 2.3% WoW driven by persistent failure rate increase (8.7%) and long tail load growth (15.4%). Primary drivers: Build 26090 regressions in Gaming cohort and NVIDIA driver 535.98 rollout.",
        soWhat:
          "User Impact Score up 4.1% affecting 284K devices. Gaming and Copilot segments at highest risk. MTTR improved 18.6% but fix coverage gaps remain in enterprise scenarios. Recommend: rollback evaluation for Build 26090, vendor engagement with NVIDIA.",
      },
    },
    Engineering: {
      whySoWhat: {
        why: "Root cause analysis identifies 3 primary failure clusters: (1) nvlddmkm.sys driver conflict in Gaming cohort (34% of failures), (2) win32kfull.sys regression in Build 26090 (28%), (3) storport.sys firmware mismatch in Dell/HP enterprise devices (18%).",
        soWhat:
          "Autotriage coverage at 87.3% with 94% confidence on top issues. False positive rate reduced to 1.8%. Immediate actions: Deploy hotfix for win32kfull.sys, coordinate with NVIDIA on driver rollback, expand firmware compatibility matrix for enterprise OEMs.",
      },
    },
    Product: {
      whySoWhat: {
        why: "User experience degradation concentrated in Gaming (4.1 normalized failure rate) and Copilot (3.6 rate) scenarios. Silent failures increased 6.7 index points indicating users experiencing degradation without visible crashes.",
        soWhat:
          "Copilot users showing 8.7% churn signal—highest risk to feature adoption. Gaming enthusiasts experiencing 73.3% increase in display-related failures impacting engagement. Recommend: Gaming performance priority lane, Copilot reliability sprint, proactive user communication for affected cohorts.",
      },
    },
  };

  const getMetricDescription = (metric) => {
    const descriptions = {
      headFailures:
        "Total count of the most frequent failure signatures. Represents the concentrated impact of known issues. Lower is better.",
      persistentFailureRate:
        "Percentage of failures that recur consistently across sessions. Indicates systemic issues vs transient problems. Target: <2%.",
      transientSpikeIndex:
        "Measure of sudden, temporary failure bursts. High values suggest environmental or load-based triggers. Baseline: <100.",
      longTailLoad:
        "Count of rare, diverse failure signatures outside top issues. Indicates ecosystem fragmentation. Growing tail signals emerging problems.",
      mttr: "Mean Time To Resolution in hours. Measures how quickly issues are diagnosed and fixed. Lower indicates faster incident response.",
      autoTriageCoverage:
        "Percentage of failures automatically categorized by ML triage system. Higher coverage reduces manual investigation burden.",
      falsePositiveRate:
        "Percentage of autotriage classifications that are incorrect. Lower values mean higher trust in automated root cause detection.",
      userImpactScore:
        "Composite score (1–10) measuring user-facing degradation including crashes, hangs, and performance issues. Lower is better.",
      reliabilityHealthIndex:
        "Overall system health score (0–100) combining all reliability metrics. >85 is healthy, <70 requires intervention.",
    };
    return descriptions[metric] || "";
  };

  const renderKPICard = (title, data, metric) => {
    const Icon =
      data.trend === "up"
        ? TrendingUp
        : data.trend === "down"
        ? TrendingDown
        : Minus;

    const lowerIsBetter = [
      "mttr",
      "falsePositiveRate",
      "headFailures",
      "persistentFailureRate",
      "transientSpikeIndex",
      "longTailLoad",
      "userImpactScore",
    ].includes(metric);

    const trendColor = lowerIsBetter
      ? data.trend === "down"
        ? "text-green-600"
        : data.trend === "up"
        ? "text-red-600"
        : "text-gray-600"
      : data.trend === "up"
      ? "text-green-600"
      : data.trend === "down"
      ? "text-red-600"
      : "text-gray-600";

    const suffix =
      title.includes("Rate") || title.includes("Coverage") ? "%" : "";

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <Icon className={`h-4 w-4 ${trendColor}`} />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {data.value}
          {suffix}
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-medium ${trendColor}`}>
            {data.change > 0 ? "+" : ""}
            {data.change}%
          </span>
          <span className="text-sm text-gray-500">WoW</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 leading-relaxed">
          {getMetricDescription(metric)}
        </div>
      </div>
    );
  };

  const openRCADrawer = (incident) => {
    setSelectedIncident(incident);
    setRcaDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Reliability Intelligence
            </h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                Export Weekly Readout
              </button>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex gap-2 mb-4">
            {["Leadership", "Engineering"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRole === role
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search incidents, signatures, drivers, builds, cohorts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="28d">28 Days</option>
              <option value="90d">90 Days</option>
            </select>

            <select
              value={selectedBuild}
              onChange={(e) => setSelectedBuild(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="26085">Build 26085</option>
              <option value="26090">Build 26090</option>
              <option value="26092">Build 26092</option>
            </select>

            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Retail">Retail</option>
              <option value="Canary">Canary</option>
              <option value="Beta">Beta</option>
              <option value="Dev">Dev</option>
            </select>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Regions</option>
              <option value="US-West">US West</option>
              <option value="US-East">US East</option>
              <option value="EU-Central">EU Central</option>
              <option value="APAC">APAC</option>
            </select>
          </div>

          <div className="flex gap-3 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyRegressions}
                onChange={(e) => setOnlyRegressions(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Only show regressions
              </span>
            </label>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4" />
              Advanced Cohort Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showAdvancedFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showAdvancedFilters && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Device & Ownership
                  </label>
                  <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    <option>All</option>
                    <option>Commercial</option>
                    <option>Gaming</option>
                    <option>MSFT-owned</option>
                    <option>External</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    OEM
                  </label>
                  <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    <option>All</option>
                    <option>Dell</option>
                    <option>HP</option>
                    <option>Lenovo</option>
                    <option>ASUS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Processor
                  </label>
                  <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    <option>All</option>
                    <option>Intel Core i7</option>
                    <option>AMD Ryzen 7</option>
                    <option>Intel Core i5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Usage Scenario
                  </label>
                  <select className="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    <option>All</option>
                    <option>Gaming</option>
                    <option>Productivity</option>
                    <option>Development</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 p-6 ${showAIAgent ? "mr-80" : ""}`}>
          {/* Executive Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Executive Summary
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {renderKPICard(
                "Head Failures",
                kpiData.headFailures,
                "headFailures"
              )}
              {renderKPICard(
                "Persistent Failure Rate",
                kpiData.persistentFailureRate,
                "persistentFailureRate"
              )}
              {renderKPICard(
                "Transient Spike Index",
                kpiData.transientSpikeIndex,
                "transientSpikeIndex"
              )}
              {renderKPICard(
                "Long Tail Load",
                kpiData.longTailLoad,
                "longTailLoad"
              )}
              {renderKPICard("MTTR (hours)", kpiData.mttr, "mttr")}
              {renderKPICard(
                "Autotriage Coverage",
                kpiData.autoTriageCoverage,
                "autoTriageCoverage"
              )}
              {renderKPICard(
                "False Positive Rate",
                kpiData.falsePositiveRate,
                "falsePositiveRate"
              )}
              {renderKPICard(
                "User Impact Score",
                kpiData.userImpactScore,
                "userImpactScore"
              )}
              {renderKPICard(
                "Reliability Health Index",
                kpiData.reliabilityHealthIndex,
                "reliabilityHealthIndex"
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {selectedRole} View: Why & So What
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Why is this happening?
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {roleContent[selectedRole].whySoWhat.why}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    So what does it mean?
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {roleContent[selectedRole].whySoWhat.soWhat}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pain Points */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pain Points
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Persistent Failures
                  </h3>
                  <button
                    onClick={() =>
                      openRCADrawer({
                        type: "persistent",
                        data: persistentFailuresData[0],
                      })
                    }
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Open RCA Hypothesis
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Recurring failures across sessions by OEM. Indicates systemic
                  hardware/driver compatibility issues.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={persistentFailuresData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="oem" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                              <p className="font-semibold text-gray-900">
                                {d.oem}
                              </p>
                              <p className="text-sm text-gray-600">
                                Failures: {d.count}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Signature: {d.signature}
                              </p>
                              <p className="text-xs text-gray-500">
                                Driver: {d.driver}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  <strong>How Autotriage uses this:</strong> Clusters failures
                  by OEM+driver signature to identify vendor-specific issues and
                  suggest targeted fixes.
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Transient Failures
                  </h3>
                  <button
                    onClick={() =>
                      openRCADrawer({
                        type: "transient",
                        data: transientTrendData,
                      })
                    }
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Open RCA Hypothesis
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Temporary failure spikes by time and region. Helps identify
                  load-based or environmental triggers.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={transientTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                              <p className="font-semibold text-gray-900">
                                {d.time}
                              </p>
                              <p className="text-sm text-gray-600">
                                Failures: {d.failures}
                              </p>
                              <p className="text-xs text-gray-500">
                                Peak Region: {d.region}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="failures"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ fill: "#ef4444", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  <strong>How Autotriage uses this:</strong> Detects temporal
                  and geographic patterns to distinguish infrastructure issues
                  from code defects.
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Head Failures
                  </h3>
                  <button
                    onClick={() =>
                      openRCADrawer({ type: "head", data: headFailuresData[0] })
                    }
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Open RCA Hypothesis
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Top 5 failure signatures by volume and impact. Red badges
                  indicate regressions from recent builds.
                </p>
                <div className="space-y-2">
                  {headFailuresData.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 rounded border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {f.signature}
                          </span>
                          {f.regression && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                              Regression
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {f.confidence}% confidence
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Volume: {f.volume}</span>
                        <span>
                          Impact:{" "}
                          <span
                            className={
                              f.impact === "Critical"
                                ? "text-red-600 font-semibold"
                                : f.impact === "High"
                                ? "text-orange-600 font-semibold"
                                : "text-yellow-600 font-semibold"
                            }
                          >
                            {f.impact}
                          </span>
                        </span>
                        <span className="text-gray-500">{f.driver}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  <strong>How Autotriage uses this:</strong> Prioritizes
                  top-impact failures for immediate investigation and tracks
                  regression patterns across builds.
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Long Tail Distribution
                  </h3>
                  <button
                    onClick={() =>
                      openRCADrawer({ type: "longtail", data: longTailData })
                    }
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Open RCA Hypothesis
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Rare failure clusters grouped by component. Growing long tail
                  indicates ecosystem fragmentation.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={longTailData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis
                      dataKey="group"
                      type="category"
                      tick={{ fontSize: 11 }}
                      width={110}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                              <p className="font-semibold text-gray-900">
                                {d.group}
                              </p>
                              <p className="text-sm text-gray-600">
                                Count: {d.count}
                              </p>
                              <p className="text-xs text-gray-500">
                                Avg Impact: {d.avgImpact}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  <strong>How Autotriage uses this:</strong> Groups rare
                  failures by driver family to identify emerging patterns before
                  they become widespread.
                </div>
              </div>
            </div>
          </div>

          {/* Trend Analysis */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Trend Analysis
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Sudden Spikes by Cohort
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Multi-cohort failure trends over time. Diverging lines
                  indicate cohort-specific issues.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={spikeTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Line
                      type="monotone"
                      dataKey="copilot"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Copilot"
                    />
                    <Line
                      type="monotone"
                      dataKey="gaming"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Gaming"
                    />
                    <Line
                      type="monotone"
                      dataKey="enterprise"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Enterprise"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-xs text-yellow-800">
                    <strong>Alert:</strong> Gaming cohort spike started Feb 05.
                    Top affected: Copilot users (+160% WoW).
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Release Impact Comparison
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Failure rate change by driver category between previous and
                  current release builds.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={releaseImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="driver" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="previous"
                      fill="#94a3b8"
                      name="Previous Release"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="current"
                      fill="#3b82f6"
                      name="Current Release"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Recovery Pattern by Cohort
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Failure resolution speed across cohorts. Slower recovery
                  indicates deeper systemic issues.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={recoveryData.map((d) => ({
                      cohort: d.cohort,
                      "Day 1": d.day1,
                      "Day 3": d.day3,
                      "Day 7": d.day7,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="cohort" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="Day 1"
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Day 3"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Day 7"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-3 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  <strong>Insight:</strong> Copilot cohort shows slower recovery
                  (38 failures at Day 7 vs Enterprise at 5), indicating
                  persistent issues.
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Root Cause Distribution
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Failure correlation to known trigger categories. Helps
                  prioritize investigation areas.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={rootCauseDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="cause" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar
                      dataKey="percentage"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Cohort Insights */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Cohort Insights
            </h2>
            <div className="flex gap-2 mb-4">
              {["Hardware", "Build", "Usage", "Geography"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              {selectedTab === "Hardware" && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Hardware Cohort Analysis
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Normalized failure rates by device model. Accounts for
                    device population to show true reliability.
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hardwareCohortData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="model" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar
                        dataKey="failureRate"
                        fill="#94a3b8"
                        name="Raw Rate"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="normalized"
                        fill="#3b82f6"
                        name="Normalized Rate"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}

              {selectedTab === "Build" && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Build Impact Delta
                    </h3>
                    <button
                      onClick={() =>
                        openRCADrawer({ type: "build", data: buildCohortData })
                      }
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Open RCA Hypothesis
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Failure rate progression across builds. Positive delta
                    indicates regressions introduced.
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={buildCohortData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="build" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar
                        dataKey="failures"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      >
                        {buildCohortData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.delta > 10 ? "#ef4444" : "#3b82f6"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}

              {selectedTab === "Usage" && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Usage Scenario Reliability
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Failure severity distribution by usage type. Stacked bars
                    show impact levels.
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={usageScenarioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="scenario" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar
                        dataKey="normal"
                        stackId="a"
                        fill="#10b981"
                        name="Normal"
                      />
                      <Bar
                        dataKey="degraded"
                        stackId="a"
                        fill="#f59e0b"
                        name="Degraded"
                      />
                      <Bar
                        dataKey="critical"
                        stackId="a"
                        fill="#ef4444"
                        name="Critical"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}

              {selectedTab === "Geography" && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Geographic & Ownership Distribution
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Failure patterns by region and device ownership type. Helps
                    identify infrastructure vs device issues.
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={geographyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar
                        dataKey="commercial"
                        fill="#3b82f6"
                        name="Commercial"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="gaming"
                        fill="#ef4444"
                        name="Gaming"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="msftOwned"
                        fill="#10b981"
                        name="MSFT-Owned"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}
            </div>
          </div>

          {/* Early Warning */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Early Warning Signals
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Growing Anomalies
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Accelerating failure trends with ML-based projections. Dotted
                  line shows predicted growth.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={growingAnomaliesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Actual"
                    />
                    <Line
                      type="monotone"
                      dataKey="projection"
                      stroke="#ef4444"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Projected"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                  <p className="text-xs text-red-800">
                    <strong>Warning:</strong> 3.5x growth acceleration detected.
                    Projected to reach 52 by W4.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  New Signatures Emerging
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Recently discovered failure patterns with growth trajectories.
                  Early detection prevents widespread impact.
                </p>
                <div className="space-y-3">
                  {newSignaturesData.map((sig, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 rounded border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {sig.signature}
                        </span>
                        <span className="text-xs text-gray-500">
                          First seen: {sig.firstSeen}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-8 flex items-end gap-0.5">
                          {sig.growth.map((val, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-blue-500 rounded-t"
                              style={{
                                height: `${
                                  (val / Math.max(...sig.growth)) * 100
                                }%`,
                              }}
                            />
                          ))}
                        </div>
                        <TrendingUp className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Rare-Case Spread Trajectory
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Tracking rare failures becoming common. Early intervention
                  window before widespread adoption.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={rareCaseSpreadData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="copilot"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Copilot"
                    />
                    <Line
                      type="monotone"
                      dataKey="retail"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Retail"
                    />
                    <Line
                      type="monotone"
                      dataKey="enterprise"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Enterprise"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Silent Failures Trending
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Hidden degradation without visible crashes. Silent harm index
                  measures user experience impact.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={silentFailuresData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Area
                      type="monotone"
                      dataKey="silent"
                      stroke="#8b5cf6"
                      fill="#c4b5fd"
                      name="Silent Failures"
                    />
                    <Area
                      type="monotone"
                      dataKey="index"
                      stroke="#ef4444"
                      fill="#fecaca"
                      name="Harm Index"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Affected Cohorts with Hidden Signals
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Cohorts showing churn signals or silent degradation. Proactive
                intervention recommended.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">
                        Cohort
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">
                        Churn Signal (%)
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">
                        Degradation Level
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">
                        Affected Devices
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {affectedCohortsData.map((c, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-2 px-3 text-sm text-gray-900">
                          {c.cohort}
                        </td>
                        <td className="py-2 px-3 text-sm">
                          <span
                            className={`font-semibold ${
                              c.churnSignal > 7
                                ? "text-red-600"
                                : c.churnSignal > 5
                                ? "text-orange-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {c.churnSignal}%
                          </span>
                        </td>
                        <td className="py-2 px-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              c.degradation === "High"
                                ? "bg-red-100 text-red-700"
                                : c.degradation === "Medium"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {c.degradation}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-600">
                          {c.devices.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Fix Effectiveness */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Fix Effectiveness
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Fix Success Rate
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Before/after comparison of key metrics post-fix deployment.
                </p>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600">
                    {fixEffectivenessData.successRate}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Overall Success Rate
                  </div>
                </div>
                <div className="space-y-3">
                  {fixEffectivenessData.beforeAfter.map((m, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded">
                      <div className="text-sm font-semibold text-gray-900 mb-2">
                        {m.metric}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">
                          Before:{" "}
                          <span className="font-semibold">{m.before}</span>
                        </span>
                        <span className="text-green-600 font-semibold">→</span>
                        <span className="text-gray-600">
                          After:{" "}
                          <span className="font-semibold text-green-600">
                            {m.after}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Repeat Reduction Trend
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Declining repeat failures indicate effective fixes. W0 is
                  current week.
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={fixEffectivenessData.repeatReduction}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="repeats"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-3 text-xs text-gray-600 bg-green-50 p-2 rounded">
                  <strong>Progress:</strong> Repeat failures reduced by 82% from
                  peak (45 → 8).
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Devices Protected
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Cumulative count of devices benefiting from deployed fixes.
                </p>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600">
                    {fixEffectivenessData.devicesProtected.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total Devices Protected
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={fixEffectivenessData.cumulativeProtection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      fill="#93c5fd"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Triage + RCA Workspace */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Triage + RCA Workspace
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Signature
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Driver
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Severity
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Impact
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Regression
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Confidence
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Top Cohort
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Suggested Root Cause
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {triageTableData
                      .filter((r) => (onlyRegressions ? r.regression : true))
                      .filter((r) =>
                        searchQuery.trim()
                          ? `${r.signature} ${r.driver} ${r.cohort} ${r.rootCause} ${r.status}`
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          : true
                      )
                      .map((row) => (
                        <tr
                          key={row.id}
                          onClick={() =>
                            openRCADrawer({ type: "triage", data: row })
                          }
                          className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                            {row.signature}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {row.driver}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                row.severity === "Critical"
                                  ? "bg-red-100 text-red-700"
                                  : row.severity === "High"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {row.severity}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900 font-semibold">
                            {row.impact}
                          </td>
                          <td className="py-3 px-4">
                            {row.regression ? (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                                Yes
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400">No</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {row.confidence}%
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {row.cohort}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {row.rootCause}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                row.status === "Fix Deployed"
                                  ? "bg-green-100 text-green-700"
                                  : row.status === "RCA Complete"
                                  ? "bg-blue-100 text-blue-700"
                                  : row.status === "Fix In Progress"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agent Panel */}
        {showAIAgent && (
          <div className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-200 shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-semibold">AI Reliability Agent</h3>
                </div>
                <button
                  onClick={() => setShowAIAgent(false)}
                  className="hover:bg-white/20 rounded p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-blue-100">
                Real-time insights and recommendations
              </p>
            </div>

            <div className="p-4 space-y-3">
              {aiInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border-l-4 ${
                    insight.type === "alert"
                      ? "bg-red-50 border-red-500"
                      : insight.type === "warning"
                      ? "bg-orange-50 border-orange-500"
                      : insight.type === "suggestion"
                      ? "bg-blue-50 border-blue-500"
                      : "bg-green-50 border-green-500"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`h-4 w-4 mt-0.5 ${
                        insight.type === "alert"
                          ? "text-red-600"
                          : insight.type === "warning"
                          ? "text-orange-600"
                          : insight.type === "suggestion"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {insight.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-left">
                    Generate Weekly Summary
                  </button>
                  <button className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-left">
                    Suggest Investigation Priority
                  </button>
                  <button className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors text-left">
                    Identify At-Risk Cohorts
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RCA Drawer */}
        {rcaDrawerOpen && selectedIncident && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Root Cause Analysis</h2>
                  <button
                    onClick={() => setRcaDrawerOpen(false)}
                    className="hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-600" />
                    What Changed
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Build 26090 deployed on Feb 3, 2026</li>
                      <li>
                        • NVIDIA driver 535.98 rolled out to Gaming cohort
                      </li>
                      <li>
                        • win32kfull.sys updated with new rendering pipeline
                      </li>
                      <li>• Firmware update for Dell XPS series (v1.8.2)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-600" />
                    Who is Affected
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-900">
                        28,456
                      </div>
                      <div className="text-sm text-gray-600">Total Devices</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-900">
                        Gaming
                      </div>
                      <div className="text-sm text-gray-600">
                        Primary Cohort
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-900">
                        73%
                      </div>
                      <div className="text-sm text-gray-600">Increase WoW</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-900">
                        Critical
                      </div>
                      <div className="text-sm text-gray-600">
                        Severity Level
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-600" />
                    Evidence
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-sm font-semibold text-gray-900">
                          Timeline Correlation
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-4">
                        Failure spike started 4 hours after Build 26090
                        deployment to Canary ring
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-sm font-semibold text-gray-900">
                          Stack Trace Pattern
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-4">
                        94% of crashes show identical call stack in
                        win32kfull.sys (offset +0x1A2C8)
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-sm font-semibold text-gray-900">
                          Cohort Isolation
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-4">
                        Limited to devices with NVIDIA GPUs running driver
                        535.98 or newer
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-600" />
                    Next Steps Checklist
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Roll back Build 26090 to Canary ring",
                      "Coordinate with NVIDIA on driver hotfix",
                      "Deploy telemetry enhancement for win32kfull.sys",
                      "Notify affected users via support channels",
                    ].map((t) => (
                      <label
                        key={t}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Owner
                    </label>
                    <input
                      type="text"
                      placeholder="Assign to..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ETA for Resolution
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Generate Incident Summary
                  </button>
                  <button
                    onClick={() => setRcaDrawerOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating AI Toggle */}
      <button
        onClick={() => setShowAIAgent((v) => !v)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        title="Toggle AI Reliability Agent"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    </div>
  );
}

// ✅ This is what you import and render from App.jsx
export default function AnomalyDetectionDashboard() {
  return <ReliabilityDashboard />;
}
