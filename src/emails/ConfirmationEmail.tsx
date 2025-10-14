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

export const ConfirmationEmail = ({ name, company }: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your audit request for {company} has been received.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank you for your request, {name}!</Heading>
        <Text style={paragraph}>
          We have successfully received your audit request for **{company}**.
        </Text>
        <Text style={paragraph}>
          Our team will analyze the files you provided and we will get back to you
          with your free audit report shortly.
        </Text>
        <Text style={paragraph}>
          Best regards,
          <br />
          The FeeLens Team
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles pour l'email
const main = { backgroundColor: "#f6f9fc", fontFamily: "Arial, sans-serif" };
const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};
const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};
const paragraph = { fontSize: "18px", lineHeight: "1.4", color: "#484848" };