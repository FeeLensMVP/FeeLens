// Fichier : emails/ConfirmationEmail.tsx

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from "@react-email/components";
import * as React from "react";

interface ConfirmationEmailProps {
  name: string;
  company: string;
}

export const ConfirmationEmail = ({ name }: ConfirmationEmailProps) => {
      // Extraire le prénom (premier mot du nom)
      const firstName = name.split(' ')[0];
      
      return (
        <Html>
          <Head />
          <Preview>Your FeeLens audit is underway</Preview>
          <Body style={main}>
            <Container style={container}>
              {/* Header simple */}
              <Section style={header}>
                <Text style={logoText}>FeeLens</Text>
              </Section>

              {/* Contenu principal */}
              <Section style={content}>
                <Heading style={heading}>Hi {firstName},</Heading>
                
                <Text style={paragraph}>
                  Thank you for submitting your bank fee statements and pricing agreement. 
                  We&apos;ve successfully received your documents and your audit is now underway.
                </Text>

                <Text style={paragraph}>
                  <strong>What happens next:</strong>
                </Text>

                <Text style={paragraph}>
                  • Our AI will analyze your bank fee statements and pricing agreement<br/>
                  • We&apos;ll identify potential overcharges and pricing inconsistencies<br/>
                  • You&apos;ll receive your detailed savings report within 7 business days
                </Text>

                <Text style={paragraph}>
                  Thanks for trusting <strong>FeeLens — the #1 enemy of bank fees.</strong>
                </Text>

                <Text style={paragraph}>
                  If you have any questions, feel free to reach out to us at support@feelens.us
                </Text>
              </Section>

              {/* Footer simple */}
              <Section style={footer}>
                <Text style={signature}>
                  Best regards,<br/>
                  The FeeLens Team
                </Text>
                <Text style={footerText}>
                  <a href="https://feelens.us" style={footerLink}>FeeLens.us</a>
                </Text>
              </Section>
            </Container>
          </Body>
        </Html>
      );
    };

// Styles simples et clean
const main = { 
  backgroundColor: "#f8fafc", 
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  margin: "0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const header = {
  backgroundColor: "#10b981",
  padding: "30px 40px",
  textAlign: "center" as const,
};

const logoText = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0",
};

const content = {
  padding: "40px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1f2937",
  marginBottom: "20px",
  marginTop: "0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#374151",
  margin: "0 0 20px 0",
};

const footer = {
  backgroundColor: "#f9fafb",
  padding: "30px 40px",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center" as const,
};

const signature = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#6b7280",
  margin: "0 0 15px 0",
};

const footerText = {
  fontSize: "14px",
  color: "#9ca3af",
  margin: "0",
};

const footerLink = {
  color: "#10b981",
  textDecoration: "none",
  fontWeight: "500",
};