
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Code, Layers, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Basic - Starter Landing Page",
      price: "£480",
      description: "Need a compelling website, fast? Our Starter Landing Page launches your business online with a polished, high-impact design, quickly and affordably.",
      features: [
        "Build instant credibility with a sleek, professional design",
        "Turn visitors into clients with clear, AI-enhanced copy",
        "Engage users with a lightning-fast, mobile-first experience",
        "Boost your Google ranking with essential on-page SEO",
        "Rest easy with standard SSL security and DDOS protection included",
        "Launch in 2-3 days, with two focused revision rounds"
      ],
      icon: Zap,
      popular: false
    },
    {
      title: "Standard - Business Brochure Site",
      price: "£1,140",
      description: "Ready for significant growth? Our Business Brochure Site provides a comprehensive platform to showcase your services, attract more customers, and elevate your brand.",
      features: [
        "Clearly present your offerings with up to 5 expertly crafted pages",
        "Improve search visibility and share expertise via an integrated blog",
        "Achieve your ideal design with two review stages and a post-launch polish",
        "Benefit from a cutting-edge, high-speed site (powered by Next.js)",
        "All Basic advantages, amplified for greater business impact",
        "Your new, impressive site live in about a week"
      ],
      icon: Layers,
      popular: true
    },
    {
      title: "Bespoke Web App",
      price: "Contact for quote",
      description: "Have a unique vision or complex operational need? We engineer powerful, secure custom web applications, precision-built for your business.",
      features: [
        "Streamline workflows with custom dashboards, secure logins, and robust databases",
        "Develop new revenue channels or client tools (e.g., e-commerce, interactive forms)",
        "Maximise impact with advanced SEO, performance optimisation, and strong security",
        "A collaborative journey: clear milestones, regular updates, and your feedback guiding us",
        "Get started easily with a comprehensive handover and user training",
        "A future-proof digital platform, engineered for your ongoing success"
      ],
      icon: Code,
      popular: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            WEBSITE DESIGN & BUILD
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We craft fast, modern sites that impress customers and fuel your growth. 
            Get a professional online presence that delivers results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className={`relative h-full flex flex-col ${service.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border border-slate-200'} hover:shadow-lg transition-all duration-300`}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                  {service.title}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">{service.price}</span>
                </div>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-auto font-bold ${service.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'} text-white`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
