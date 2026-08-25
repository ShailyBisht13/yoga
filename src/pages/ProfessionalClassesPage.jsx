import ClassLevelsTemplate from './classes/ClassLevelsTemplate';

export default function ProfessionalClassesPage() {
  return (
    <ClassLevelsTemplate
      metaKey="classesIntermediate"
      pageKey="professional-classes"
      defaultLevel="intermediate"
      badgeLabel="Professional Practice"
      heroTitleLead="A Practice That Fits Your"
      heroTitleAccent="Schedule"
      heroDescription="Built for practitioners balancing work and training. Morning, evening, and weekend batches span every level — Beginner, Intermediate, and Advance — so your practice can grow as steadily as your career."
      ctaHeading="Ready to Commit to a Batch?"
      ctaDescription="Let us know your current level and the hours that work for you, and we'll slot you into the right batch — Beginner through Advance."
    />
  );
}