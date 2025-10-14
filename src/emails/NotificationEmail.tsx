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
        <Heading style={heading}>🚀 New Audit Request!</Heading>
        <Text style={paragraph}>A new audit request has been submitted.</Text>
        <Text style={paragraph}>
          **Company:** {company}
          <br />
          **Contact Name:** {name}
          <br />
          **Contact Email:** {email}
          <br />
          **Files Uploaded:** {fileCount}
        </Text>
        <Text style={paragraph}>
          You can now review the files in the UploadThing dashboard.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles (vous pouvez réutiliser les mêmes que pour l'autre email)
const main = { backgroundColor: "#f6f9fc" };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", width: "580px" };
const heading = { fontSize: "32px", color: "#484848" };
const paragraph = { fontSize: "18px", color: "#484848" };