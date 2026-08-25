import ClassLevelsTemplate from './classes/ClassLevelsTemplate';

export default function StudentClassesPage() {
  return (
    <ClassLevelsTemplate
      metaKey="classesBeginner"
      pageKey="student-classes"
      defaultLevel="beginner"
      badgeLabel="Student Programs"
      heroTitleLead="Your Practice,"
      heroTitleAccent="Your Pace"
      heroDescription="Whether you're rolling out a mat for the first time or picking up where a stronger practice left off, our student track moves with you — Beginner, Intermediate, and Advance batches, all under one roof."
      ctaHeading="Ready to Find Your Level?"
      ctaDescription="Tell us where you're starting from and we'll place you in the batch — Beginner, Intermediate, or Advance — that fits you best."
    />
  );
}