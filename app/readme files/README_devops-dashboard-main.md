# DevOps Dashboard — Real-Time Monitoring System

A comprehensive **DevOps monitoring dashboard** that provides real-time visibility into CI/CD pipeline metrics, application health, and system performance — built with Flask, Prometheus, Grafana, and Pushgateway, with automated GitHub Actions workflows.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running All Services](#running-all-services)
  - [Configuring Grafana](#configuring-grafana)
- [CI/CD Pipeline & Metrics Simulation](#cicd-pipeline--metrics-simulation)
- [Grafana Dashboards](#grafana-dashboards)
- [API Endpoints](#api-endpoints)
- [Metrics Reference](#metrics-reference)
- [DevOps Concepts Demonstrated](#devops-concepts-demonstrated)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

This project demonstrates a **production-grade DevOps observability stack** running locally. It collects over 30 real-time metrics every 5 seconds, stores them in Prometheus, and visualizes them across 4 professional Grafana dashboards.

A key challenge in DevOps monitoring is that GitHub Actions runs in the **cloud** while Prometheus runs **locally** — they cannot communicate directly. This project solves that with a **CI/CD Metrics Simulator** (`cicd_metrics.py`) that mimics real pipeline behavior locally and pushes metrics to Prometheus via Pushgateway.

---

## Features

### CI/CD Pipeline Monitoring
- Build success rate tracking with configurable thresholds
- Build duration monitoring and trend analysis
- Test results (passed / failed / total count)
- Pipeline run counting and deployment frequency
- Real-time metric delivery via Pushgateway

### Application Monitoring
- HTTP request tracking by endpoint, method, and status code
- Response time histograms with p95 percentile calculation
- Error rate categorization and trending
- Active request counting and uptime tracking

### System Monitoring
- CPU usage percentage and core count
- Memory consumption (total, used, available)
- Disk space utilization
- Network I/O (bytes sent/received)
- Process-level metrics (threads, memory)

### Dashboards
- 4 professional Grafana dashboards with 40+ panels total
- Auto-provisioned dashboard JSON files included

---

## Tech Stack

| Category | Technology |
|---|---|
| Backend | Python 3.12, Flask 3.0.0 |
| Metrics Collection | prometheus-client, psutil |
| Metrics Storage | Prometheus (time-series DB) |
| Metric Push Gateway | Pushgateway (for CI/CD metrics) |
| Visualization | Grafana |
| CI/CD | GitHub Actions |
| Containerization | Docker, Dockerfile |
| Testing | pytest, flake8 |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│              GitHub Actions (Cloud)              │
│   CI Pipeline: lint → test → health check        │
└─────────────────────────────────────────────────┘
                 (Cannot reach localhost)

┌─────────────────────────────────────────────────┐
│              Local Environment                   │
│                                                  │
│  Flask App (5000) ──────────────────────────┐   │
│  cicd_metrics.py ──► Pushgateway (9091) ─┐  │   │
│                                           ▼  ▼   │
│                         Prometheus (9090) ───►   │
│                               │                  │
│                               ▼                  │
│                         Grafana (3000)            │
│                    4 Monitoring Dashboards        │
└─────────────────────────────────────────────────┘
```

---

## Project Structure

```
devops-dashboard-main/
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI pipeline: linting, testing, health checks
│       └── metrics.yml         # Collects workflow data from GitHub API
│
├── app/
│   ├── main.py                 # Flask application with Prometheus metrics
│   ├── cicd_metrics.py         # CI/CD metrics simulator (pushes to Pushgateway)
│   ├── test_main.py            # Unit tests (7 tests)
│   └── requirements.txt        # Python dependencies
│
├── monitoring/
│   ├── prometheus.yml          # Prometheus config (scrapes Flask + Pushgateway)
│   └── grafana/
│       └── dashboards/
│           ├── application-health.json
│           ├── system-performance.json
│           ├── devops-overview.json
│           └── cicd-pipeline.json
│
├── demo-images/                # Dashboard screenshots
├── load-test.py                # Traffic generation script
├── Dockerfile                  # Docker container definition
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.12+
- [Prometheus](https://prometheus.io/download/) — extract and note path
- [Pushgateway](https://prometheus.io/download/#pushgateway) — extract and note path
- [Grafana](https://grafana.com/grafana/download) — install via installer

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/devops-dashboard-main.git
   cd devops-dashboard-main
   ```

2. Create virtual environment and install dependencies:
   ```bash
   python -m venv venv
   venv\Scripts\activate        # Windows
   source venv/bin/activate     # Linux/Mac
   pip install -r app/requirements.txt
   ```

### Running All Services

You need **5 terminals** running simultaneously:

```bash
# Terminal 1 — Pushgateway
cd C:\pushgateway
.\pushgateway.exe

# Terminal 2 — Prometheus (point it at monitoring/prometheus.yml)
cd C:\prometheus
.\prometheus.exe --config.file=path\to\monitoring\prometheus.yml

# Terminal 3 — Flask Application
cd devops-dashboard-main/app
python main.py

# Terminal 4 — CI/CD Metrics Simulator
cd devops-dashboard-main/app
python cicd_metrics.py

# Terminal 5 — Grafana
cd "C:\Program Files\GrafanaLabs\grafana\bin"
.\grafana-server.exe
```

### Configuring Grafana

1. Open `http://localhost:3000` (default login: `admin` / `admin`)
2. Go to **Configuration → Data Sources → Add data source**
3. Select **Prometheus** → set URL to `http://localhost:9090` → Save & Test
4. Go to **Dashboards → Import** and import all 4 JSON files from `monitoring/grafana/dashboards/`

---

## CI/CD Pipeline & Metrics Simulation

### Why a Simulator?

GitHub Actions runs on GitHub's cloud servers and cannot push metrics directly to `localhost:9090`. The `cicd_metrics.py` simulator runs locally and mimics real pipeline events every 30 seconds:

```
🔄 Simulating CI/CD run #1...
   📦 Build: SUCCESS (45.2s)
   🧪 Tests: 7/7 passed
   🚀 Deploy to production: SUCCESS
   ✅ Metrics pushed to Pushgateway
```

### Simulated Metrics

| Metric | Type | Description |
|---|---|---|
| `ci_build_duration_seconds` | Gauge | Build execution time (30–180s range) |
| `ci_build_total` | Counter | Total builds by success/failure status |
| `ci_build_success_rate` | Gauge | Rolling success percentage |
| `ci_tests_total` | Gauge | Total tests in suite |
| `ci_tests_passed` | Gauge | Passed test count |
| `ci_tests_failed` | Gauge | Failed test count |
| `ci_pipeline_runs_total` | Counter | Total pipeline executions |
| `ci_deployments_total` | Counter | Deployments by environment |

---

## Grafana Dashboards

| Dashboard | Key Panels |
|---|---|
| **Application Health Monitor** | Request rate, response time p95, error rate, uptime |
| **System Performance Monitor** | CPU/Memory/Disk gauges, network I/O trends |
| **DevOps Overview Dashboard** | Service status, API call volume, quick health overview |
| **CI/CD Pipeline Metrics** | Build success rate gauge, test pass/fail stats, deployment counter |

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | API information and status |
| `/api/health` | GET | Application health check |
| `/api/data` | GET | Sample data response |
| `/api/stats` | GET | Current system statistics |
| `/api/error` | GET | Error simulation (for testing alerts) |
| `/metrics` | GET | Prometheus metrics scrape endpoint |

---

## Metrics Reference

### Application Metrics

| Metric | Type | Description |
|---|---|---|
| `http_requests_total` | Counter | HTTP requests by endpoint/method/status |
| `http_request_duration_seconds` | Histogram | Request latency distribution |
| `http_errors_total` | Counter | Error count by type |
| `app_uptime_seconds` | Gauge | Application uptime in seconds |

### System Metrics

| Metric | Type | Description |
|---|---|---|
| `cpu_usage_percent` | Gauge | CPU utilization % |
| `memory_usage_percent` | Gauge | RAM utilization % |
| `disk_usage_percent` | Gauge | Disk utilization % |
| `network_bytes_sent` | Gauge | Network bytes transmitted |
| `network_bytes_recv` | Gauge | Network bytes received |

---

## DevOps Concepts Demonstrated

- **Observability** — Full visibility across application, system, and CI/CD layers
- **Push vs Pull Metrics** — Pushgateway pattern for short-lived/batch jobs
- **Time-Series Monitoring** — Prometheus storage with PromQL queries
- **Data Visualization** — Grafana dashboard design with thresholds and alerts
- **CI/CD Automation** — GitHub Actions for automated testing and linting
- **Infrastructure as Code** — YAML-based configuration for all services
- **Containerization** — Dockerfile for portable deployment
- **Metric Types** — Counters, Gauges, and Histograms in practice

---

## Contributing

Contributions are welcome! Ideas:
- Docker Compose setup for one-command startup
- Alertmanager integration for email/Slack notifications
- Kubernetes deployment manifests
- Real GitHub API integration for actual workflow metrics

---

## Author

**Muneeb Ur Rehman**
GitHub: [@muneeb1481](https://github.com/muneeb1481)
