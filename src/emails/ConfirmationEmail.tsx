// Fichier : emails/ConfirmationEmail.tsx

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

interface ConfirmationEmailProps {
  name: string;
  company: string;
}

export const ConfirmationEmail = ({ name, company }: ConfirmationEmailProps) => {
  // Extraire le prénom (premier mot du nom)
  const firstName = name.split(' ')[0];
  
  return (
    <Html>
      <Head />
      <Preview>Your FeeLens audit is underway</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Hi {firstName},</Heading>
          <Text style={paragraph}>
            We've successfully received your bank fee statement and pricing agreement.
          </Text>
          <Text style={paragraph}>
            Our team is now reviewing your data to identify hidden fees, overcharges, and ECR discrepancies. 
            You'll receive your audit summary within 7 business days.
          </Text>
          <Text style={paragraph}>
            Thanks for trusting <strong style={bold}>FeeLens — the #1 enemy of bank fees.</strong>
          </Text>
          <Text style={signature}>
            Best regards,
            <br />
            The FeeLens Team
            <br />
            <span style={link}>FeeLens.us</span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles pour l'email
const main = { 
  backgroundColor: "#f6f9fc", 
  fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  padding: "20px 0",
};
const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 30px",
  width: "580px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};
const heading = {
  fontSize: "24px",
  lineHeight: "1.4",
  fontWeight: "600",
  color: "#1a1a1a",
  marginBottom: "24px",
};
const paragraph = { 
  fontSize: "16px", 
  lineHeight: "1.6", 
  color: "#374151",
  marginBottom: "16px",
};
const bold = {
  color: "#1a1a1a",
  fontWeight: "700",
};
const signature = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#6b7280",
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: "1px solid #e5e7eb",
};
const link = {
  color: "#3b82f6",
  textDecoration: "none",
};