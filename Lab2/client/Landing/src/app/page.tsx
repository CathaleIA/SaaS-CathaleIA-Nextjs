"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import { FaWhatsapp, FaGithubAlt, FaLinkedin, FaCheckCircle, FaShieldAlt, FaPlayCircle, FaArrowRight } from "react-icons/fa";

import { useTranslation } from '@/../hooks/useTranlation';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const [isYearly, setIsYearly] = useState(false)

  // Calculate yearly prices (20% discount)
  const getPrice = (monthlyPrice: number) => {
    const yearlyPrice = (monthlyPrice * 12 * 0.8).toFixed(0)
    return isYearly ? `$${yearlyPrice}` : `$${monthlyPrice}`
  }

  const t = useTranslation();

  // Pricing period text
  const pricingPeriod = isYearly ? `/${t.pricing.topics[1]}` : `/${t.pricing.topics[0]}`;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full relative h-screen">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source
                src="/assets/hero_video.mp4" type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Content */}
          <div className="container relative z-20 px-4 md:px-6 max-w-full overflow-hidden h-full flex items-center">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    {t.hero.title}
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    {t.hero.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1"
                    onClick={() => {
                      router.push('/signup');
                    }}
                  >
                    {t.hero.buttons.getStarted} <FaArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    {t.hero.buttons.demo}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {t.features.head}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t.features.title}</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t.features.description}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl py-12">
              {/* Flex column on small/medium screens, grid on large screens */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left side: 2x2 grid of feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.features.items.map((feature, index) => (
                    <div key={index} className="flex flex-col p-6 bg-background rounded-lg border shadow-sm h-full">
                      <FaCheckCircle className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
                {/* Right side: Image */}
                <div className="flex items-center justify-center mt-8 lg:mt-0">
                  {/* <video
                    src="/assets/secuencia_02.mp4"
                    width={600}
                    height={600}
                    className="rounded-xl object-cover object-center shadow-lg max-w-full h-auto"
                    controls
                    autoPlay
                    loop
                    muted
                  >
                    Your browser does not support the video tag.
                  </video> */}

                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source
                      src="/assets/secuencia_02.mp4" type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>


                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Dashboard Showcase Section */}
        <section id="dashboard" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {t.dashboard.head}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  {t.dashboard.title}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t.dashboard.description}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl mt-12">
              <Tabs defaultValue="analytics" className="w-full">
                <div className="flex justify-center mb-8 overflow-x-auto pb-2 -mx-4 px-4">
                  <TabsList className="flex-nowrap">
                    {t.dashboard.tabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
                        {tab.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {t.dashboard.tabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value} className="relative border rounded-lg p-1">
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <Button variant="outline" size="sm" className="bg-background/90 hover:bg-background hidden sm:flex">
                        <FaPlayCircle className="h-4 w-4 mr-2" /> {t.dashboard.demo.watch}
                      </Button>
                      <Button size="sm" className="bg-primary/90 hover:bg-primary">
                        {t.dashboard.demo.try}
                      </Button>
                    </div>
                    <div className="w-full max-w-[1200px] max-h-[400px] overflow-hidden">
                      <Image
                        src="/assets/withoutimg.jpg"
                        alt="Analytics Dashboard"
                        width={800}
                        height={400}
                        className="rounded-lg border shadow-lg w-full h-auto object-cover"
                      />
                    </div>
                    <div className="bg-background/95 backdrop-blur-sm absolute bottom-0 left-0 right-0 p-4 md:p-6 rounded-b-lg border-t">
                      <h3 className="text-lg md:text-xl font-bold mb-2">{tab.title2}</h3>
                      <p className="text-muted-foreground mb-4 text-sm md:text-base">
                        {tab.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tab.keys.map(
                          (feature) => (
                            <span key={feature} className="bg-muted px-3 py-1 rounded-full text-xs font-medium">
                              {feature}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </TabsContent>
                ))
                }
              </Tabs>
            </div>
          </div>
        </section>
        {/* Integrations Section */}
        <section id="integrations" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {t.integrations.head}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t.integrations.title}</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t.integrations.description}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl mt-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 md:p-6 bg-background rounded-lg border shadow-sm"
                  >
                    <Image
                      src="/assets/withoutimg.jpg"
                      alt={`Integration Partner ${index}`}
                      width={120}
                      height={60}
                      className="h-10 md:h-12 w-auto object-contain mb-2 md:mb-3"
                    />
                    <span className="text-xs md:text-sm font-medium text-center">{`Integration ${index}`}</span>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">{t.integrations.api.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {t.integrations.api.description}
                  </p>
                  <ul className="space-y-2 mt-4">
                    {t.integrations.api.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <FaCheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background p-4 md:p-6 rounded-lg border shadow-sm">
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-bold">{t.integrations.process.title}</h3>
                    <ol className="space-y-4">
                      {t.integrations.process.steps.map((step, index) => (
                        <li key={index} className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full bg-primary text-primary-foreground font-bold text-xs md:text-sm mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm md:text-base">{step.title}</h4>
                            <p className="text-xs md:text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="security" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {t.security.head}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  {t.security.title}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t.security.description}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-6xl mt-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.security.features.map((item, index) => (
                  <div key={index} className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FaShieldAlt className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 bg-background rounded-lg border shadow-sm overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{t.security.oursecurity.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      {t.security.oursecurity.description}
                    </p>
                    <ul className="space-y-3">
                      {t.security.oursecurity.listsecurity.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-muted p-8 flex flex-col justify-center items-center">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {["SOC", "GDPR", "HIPAA", "ISO"].map((cert, index) => (
                        <div key={index} className="bg-background rounded-lg p-4 flex items-center justify-center">
                          <Image
                            src="/assets/withoutimg.jpg"
                            alt={`${cert} Certification`}
                            width={120}
                            height={60}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      {t.security.finaltext}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {t.testimonials.head}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t.testimonials.title}</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t.testimonials.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {t.testimonials.items.map((testimonial, index) => (
                <div key={index} className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
                  <p className='text-muted-foreground'>{testimonial.quote}</p>
                  <div className="mt-6">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {t.pricing.head}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t.pricing.title}</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t.pricing.description}
                </p>
              </div>
              {/* Pricing Toggle */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <span className={`text-sm font-medium ${!isYearly ? "text-primary" : "text-muted-foreground"}`}>
                  {t.pricing.topics[0]}
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isYearly ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white transition-transform duration-200 ${isYearly ? 'translate-x-5' : 'translate-x-1'}`}
                  />
                </button>
                <span className={`text-sm font-medium ${isYearly ? "text-primary" : "text-muted-foreground"}`}>
                  {t.pricing.topics[1]} <span className="text-xs text-primary">Save 20%</span>
                </span>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {t.pricing.plans.map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col rounded-lg border p-6 shadow-sm ${plan.popular ? `border-primary ring-2 ${isYearly ? "ring-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]" : "ring-primary"}` : ""}`}
                >
                  {plan.popular && (
                    <div className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground mb-4 self-start">
                      {isYearly && <span className="text-yellow-300">👑</span>}
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{getPrice(plan.monthlyPrice)}</span>
                    <span className="ml-1 text-muted-foreground">{pricingPeriod}</span>
                  </div>
                  {isYearly && (
                    <div className="mt-2">
                      <p className="text-sm text-primary">{`$${plan.monthlyPrice}/mo billed annually`}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">+1 months free</span>
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Priority support</span>
                      </div>
                    </div>
                  )}
                  <p className="mt-2 text-muted-foreground">{plan.description}</p>
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <FaCheckCircle className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6" variant={plan.popular ? "default" : "outline"}
                    onClick={() => {
                        router.push('/signup');
                    }}
                  >
                    {t.pricing.button}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t.cta.title}</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {t.cta.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1"
                  onClick={() => {
                    router.push('/signup');
                }}
                >
                  {t.cta.button[0]} <FaArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  {t.cta.button[1]}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6 max-w-full overflow-hidden">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/insignia_degrade.png"
              alt="StreamLine Logon"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-xl font-bold">CathaleIA</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <FaWhatsapp className="h-5 w-5" />
              <span className="sr-only">Whatsapp</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <FaLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <FaGithubAlt className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

