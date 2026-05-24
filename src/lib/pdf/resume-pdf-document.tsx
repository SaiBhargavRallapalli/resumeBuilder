import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeDocument } from "@/lib/types/resume";

function formatDate(d: string, current?: boolean) {
  if (!d) return current ? "Present" : "";
  const [y, m] = d.split("-");
  if (m) {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(m, 10) - 1] ?? m} ${y}`;
  }
  return y ?? d;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#111827",
  },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  jobTitle: { fontSize: 11, color: "#374151", marginBottom: 6 },
  contact: { fontSize: 9, color: "#4b5563", marginBottom: 12 },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },
  summary: { marginBottom: 4, textAlign: "justify" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  bold: { fontWeight: "bold" },
  sub: { color: "#374151", marginBottom: 2 },
  bullet: { marginLeft: 10, marginBottom: 2 },
  skills: { marginBottom: 4 },
});

interface ResumePdfDocumentProps {
  resume: ResumeDocument;
}

export function ResumePdfDocument({ resume }: ResumePdfDocumentProps) {
  const { sections, visibility } = resume;
  const { contact } = sections;

  const contactLine = [
    contact.email,
    contact.phone,
    contact.location,
    contact.linkedin,
    contact.website,
  ].filter(Boolean).join(" | ");

  return (
    <Document title={resume.title} author={contact.fullName || "ResumeCraft"}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{contact.fullName || "Your Name"}</Text>
        {contact.jobTitle ? (
          <Text style={styles.jobTitle}>{contact.jobTitle}</Text>
        ) : null}
        {contactLine ? (
          <Text style={styles.contact}>{contactLine}</Text>
        ) : null}

        {visibility.summary && sections.summary ? (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{sections.summary}</Text>
          </View>
        ) : null}

        {visibility.experience && sections.experience.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {sections.experience.map((exp) => (
              <View key={exp.id} wrap={false}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{exp.position}</Text>
                  <Text>
                    {formatDate(exp.startDate)} –{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.sub}>
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </Text>
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <Text key={i} style={styles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {visibility.education && sections.education.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {sections.education.map((edu) => (
              <View key={edu.id} wrap={false}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </Text>
                  <Text>
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.sub}>
                  {edu.institution}
                  {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {visibility.skills && sections.skills.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skills}>{sections.skills.join(" · ")}</Text>
          </View>
        ) : null}

        {visibility.projects && sections.projects.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {sections.projects.map((p) => (
              <View key={p.id} wrap={false}>
                <Text style={styles.bold}>{p.name}</Text>
                {p.description ? <Text style={styles.sub}>{p.description}</Text> : null}
                {p.bullets.filter(Boolean).map((b, i) => (
                  <Text key={i} style={styles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {visibility.certifications && sections.certifications.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {sections.certifications.map((c) => (
              <Text key={c.id} style={styles.sub}>
                {c.name}{c.issuer ? ` — ${c.issuer}` : ""}{c.date ? ` (${c.date})` : ""}
              </Text>
            ))}
          </View>
        ) : null}

        {visibility.awards && sections.awards.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Awards</Text>
            {sections.awards.map((a) => (
              <Text key={a.id} style={styles.sub}>
                {a.title}{a.issuer ? ` — ${a.issuer}` : ""}{a.date ? ` (${a.date})` : ""}
              </Text>
            ))}
          </View>
        ) : null}

        {visibility.languages && sections.languages.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.skills}>
              {sections.languages.map((l) => `${l.name} (${l.proficiency})`).join(" · ")}
            </Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
