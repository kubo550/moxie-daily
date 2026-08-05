export default function HeaderSection({ className }: { className: string }) {
  return (
    <section className={className}>
      <h1 className="text-2xl md:pt-8 font-bold mb-4 text-left pt-3 md:py-4 text-white">
        About Moxie
      </h1>
      <p className="text-lg leading-relaxed">
        A Bridge of Support. A Badge of Strength. A Daily Reminder That You
        Matter.
      </p>
    </section>
  );
}
