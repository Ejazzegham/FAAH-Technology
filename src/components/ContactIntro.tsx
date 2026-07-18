export default function ContactIntro() {
  return (
    <section className="section pt-0">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold">
          <span aria-hidden className="h-px w-5 bg-gradient-to-r from-transparent to-gold" />
          LET&apos;S TALK
          <span aria-hidden className="h-px w-5 bg-gradient-to-l from-transparent to-gold" />
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
          Contact <span className="text-gold">Us</span>
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <p className="font-display text-lg leading-relaxed text-white/90 sm:text-xl">
          At HZ Technology, every great project starts with a conversation.
          Whether you need a new brand, website, mobile app, or custom
          software solution, we&apos;re here to turn your ideas into reality.
        </p>

        <div aria-hidden className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="mx-auto mt-6 max-w-2xl space-y-6 text-base leading-loose text-muted">
          <p>
            We provide Graphic Design, Website Development, Mobile App
            Development, and Custom Software Solutions with a focus on
            quality, clear communication, and timely delivery.
          </p>
          <p className="font-medium text-white/80">
            Your success is our priority. Contact us today to discuss your
            project, get expert guidance, and create a digital solution that
            helps your business grow.
          </p>
        </div>
      </div>
    </section>
  );
}
