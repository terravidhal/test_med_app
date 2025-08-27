import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching reports data
    const fetchReports = () => {
      // Mock data for demonstration
      const mockReports = [
        {
          id: 1,
          patientName: "John Doe",
          doctorName: "Dr. Sarah Johnson",
          date: "2024-01-15",
          type: "Blood Test",
          status: "Completed",
          fileName: "blood_test_report.pdf"
        },
        {
          id: 2,
          patientName: "John Doe",
          doctorName: "Dr. Michael Chen",
          date: "2024-01-10",
          type: "X-Ray",
          status: "Completed",
          fileName: "xray_report.pdf"
        },
        {
          id: 3,
          patientName: "John Doe",
          doctorName: "Dr. Emily Brown",
          date: "2024-01-05",
          type: "General Checkup",
          status: "Completed",
          fileName: "checkup_report.pdf"
        }
      ];
      
      setTimeout(() => {
        setReports(mockReports);
        setLoading(false);
      }, 1000);
    };

    fetchReports();
  }, []);

  const handleViewReport = (fileName) => {
    // Open report in new tab
    window.open(`/reports/${fileName}`, '_blank');
  };

  const handleDownloadReport = (fileName) => {
    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = `/reports/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="reports-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Medical Reports</h1>
        <p>View and download your medical reports</p>
      </div>

      {reports.length === 0 ? (
        <div className="no-reports">
          <div className="no-reports-icon">📋</div>
          <h3>No Reports Available</h3>
          <p>You don't have any medical reports yet. Reports will appear here after your consultations.</p>
        </div>
      ) : (
        <div className="reports-content">
          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Report Type</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{new Date(report.date).toLocaleDateString()}</td>
                    <td>
                      <span className="report-type">{report.type}</span>
                    </td>
                    <td>{report.doctorName}</td>
                    <td>
                      <span className={`status ${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewReport(report.fileName)}
                        title="View Report"
                      >
                        👁️ View
                      </button>
                      <button
                        className="action-btn download-btn"
                        onClick={() => handleDownloadReport(report.fileName)}
                        title="Download Report"
                      >
                        📥 Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reports-summary">
            <div className="summary-card">
              <h3>Reports Summary</h3>
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-number">{reports.length}</span>
                  <span className="stat-label">Total Reports</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {reports.filter(r => r.status === 'Completed').length}
                  </span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {reports.filter(r => r.status === 'Pending').length}
                  </span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsLayout; 