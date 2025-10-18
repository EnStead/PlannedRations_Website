


const faqs = [
  {
    question: "Do I need special equipment to use PlannedRations?",
    answer:
      "Nope! All you need is your phone. Our app works with your camera to scan meals and barcodes, and everything else is handled inside the app.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription at any time with just one tap in your account settings—no hidden fees or lock-ins.",
  },
  {
    question: "Does PlannedRations work for families?",
    answer:
      "Absolutely! With our Family Plan, you can add up to 6 members under one subscription, so everyone gets their own personalized meal plans and grocery lists.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "We offer a 14-day free trial for all plans. You’ll get full access to every feature, and you can decide later if you’d like to continue.",
  },
  {
    question: "What makes PlannedRations different from other meal planning apps?",
    answer:
      "Unlike generic planners, PlannedRations adapts to your pantry items, nutrition goals, and budget—plus it helps you cut food waste and save money.",
  },
  {
    question: "Do you support dietary needs like vegan or gluten-free?",
    answer:
      "Yes! You can set dietary preferences and restrictions (like vegan, keto, nut-free, etc.), and the app will recommend meals and plans that fit your lifestyle.",
  },
];

const FAQSection = () => {
  return (
    <section id='faq' className="py-27 px-7 xsm:px-15 min-h-[100vh] bg-brand-carhead">
        <div className="">
            {/* Title & Subtitle */}
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-brand-head mb-4 max-w-[470px]">
                Got Questions? We’ve Got Answers.
            </h2>
            <p className="font-sans text-brand-subtext font-normal text-lg sm:text-2xl  mb-12">
                Everything you need to know about how PlannedRations <br /> works and how it can help you every day.
            </p>

            {/* FAQ Grid */}
            <div className="grid ml:grid-cols-3 gap-10 ml:gap-8 text-left mt-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                    
                    >
                    <h3 className=" font-heading text-brand-subtext font-semibold text-lg sm:text-xl mb-2">{faq.question}</h3>
                    <p className="text-brand-cartext font-normal text-base sm:text-lg leading-relaxed ">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default FAQSection