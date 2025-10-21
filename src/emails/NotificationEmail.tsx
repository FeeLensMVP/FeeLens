// Fichier : emails/NotificationEmail.tsx

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface NotificationEmailProps {
  name: string;
  company: string;
  email: string;
  fileCount: number;
}

export const NotificationEmail = ({ name, company, email, fileCount }: NotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New Audit Request: {company}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header avec badge */}
        <div style={header}>
          <Heading style={heading}>🚀 New Audit Request</Heading>
          <div style={badge}>Action Required</div>
        </div>
        
        <Text style={intro}>
          A new client has submitted their bank fee audit request. Review the details below:
        </Text>

        {/* Card avec les détails */}
        <div style={detailsCard}>
          <div style={detailRow}>
            <span style={label}>Company</span>
            <span style={value}>{company}</span>
          </div>
          <div style={detailRow}>
            <span style={label}>Contact Name</span>
            <span style={value}>{name}</span>
          </div>
          <div style={detailRow}>
            <span style={label}>Email</span>
            <span style={valueEmail}>{email}</span>
          </div>
          <div style={detailRow}>
            <span style={label}>Files Uploaded</span>
            <span style={valueHighlight}>{fileCount} file{fileCount > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Action button */}
        <div style={actionSection}>
          <Text style={actionText}>Next Steps:</Text>
          <Text style={actionItem}>✓ Review files in UploadThing dashboard</Text>
          <Text style={actionItem}>✓ Start the audit analysis</Text>
          <Text style={actionItem}>✓ Deliver results within 7 business days</Text>
        </div>

        <Text style={footer}>
          This notification was sent to all admin accounts.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles modernes pour l'email de notification
const main = { 
  backgroundColor: "#f3f4f6", 
  fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  padding: "40px 20px",
};

const container = { 
  backgroundColor: "#ffffff", 
  margin: "0 auto", 
  padding: "0", 
  width: "600px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
};

const header = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "32px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const heading = { 
  fontSize: "28px", 
  color: "#ffffff",
  margin: "0",
  fontWeight: "700",
};

const badge = {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  color: "#ffffff",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const intro = {
  fontSize: "16px",
  color: "#4b5563",
  lineHeight: "1.6",
  padding: "24px 40px",
  margin: "0",
};

const detailsCard = {
  backgroundColor: "#f9fafb",
  margin: "0 40px 24px 40px",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #e5e7eb",
};

const label = {
  fontSize: "14px",
  color: "#6b7280",
  fontWeight: "500",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const value = {
  fontSize: "16px",
  color: "#111827",
  fontWeight: "600",
};

const valueEmail = {
  fontSize: "16px",
  color: "#3b82f6",
  fontWeight: "500",
};

const valueHighlight = {
  fontSize: "16px",
  color: "#10b981",
  fontWeight: "700",
  backgroundColor: "#d1fae5",
  padding: "4px 12px",
  borderRadius: "6px",
};

const actionSection = {
  padding: "24px 40px",
  backgroundColor: "#eff6ff",
  margin: "0 40px 24px 40px",
  borderRadius: "8px",
  borderLeft: "4px solid #3b82f6",
};

const actionText = {
  fontSize: "16px",
  color: "#1e40af",
  fontWeight: "700",
  margin: "0 0 12px 0",
};

const actionItem = {
  fontSize: "14px",
  color: "#1e3a8a",
  margin: "8px 0",
  paddingLeft: "4px",
};

const footer = {
  fontSize: "13px",
  color: "#9ca3af",
  textAlign: "center" as const,
  padding: "0 40px 32px 40px",
  fontStyle: "italic",
};