
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Users, Zap } from "lucide-react";

const Hosting = () => {
  const plans = [
    {
      title: "Care Basic",
      price: "£60",
      period: "/ month",
      description: "Want a website that just works, effortlessly? Our Basic Care plan handles all technical hosting and maintenance, delivering a reliable, secure online presence.",
      features: [
        "Enjoy fast, dependable hosting with SSL and a global CDN for speed",
        "Benefit from 24/7 uptime monitoring and weekly data backups for peace of mind",
        "Keep content fresh with up to 30 minutes of minor updates monthly",
        "Access friendly, next-business-day support for any questions",
        "A secure, smoothly operating website, completely hands-free"
      ],
      icon: Shield,
      popular: false
    },
    {
      title: "Care Growth",
      price: "£120",
      period: "/ month",
      description: "Want your website to continuously adapt and drive better results? Our Growth plan provides monthly expert assistance to enhance and evolve your site strategically.",
      features: [
        "All Basic Care protections, plus dedicated time for site improvements",
        "Two hours monthly of expert design/development for new features, pages, or SEO",
        "Stay informed with concise monthly performance and security reports",
        "Receive prompt assistance with same-day support",
        "Consistently elevate your site's effectiveness and user experience"
      ],
      icon: Zap,
      popular: true
    },
    {
      title: "Care Premium",
      price: "£480",
      period: "/ month",
      description: "For businesses requiring elite support and a proactive technology partner, our Premium Care plan offers ultimate peace of mind and strategic advancement for your vital online asset.",
      features: [
        "All Growth Care advantages, with substantially more dedicated expert time",
        "Five hours monthly of priority design/development for significant enhancements",
        "Benefit from advanced security: daily backups and robust online attack protection",
        "Shape your digital future with a quarterly strategy call and clear action plan",
        "Critical issue? Our emergency hotline ensures a response in under 4 hours"
      ],
      icon: Users,
      popular: false
    }
  ];

  return (
    <section id="hosting" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">
            Deploy & Manage
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Our Managed Hosting & Care plans ensure your site is fast, secure, and backed by expert support. So you can focus on your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative h-full flex flex-col ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border border-slate-200'} hover:shadow-lg transition-all duration-300`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <plan.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.title}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-slate-500 ml-2">{plan.period}</span>
                </div>
                <CardDescription className="text-slate-600 text-left leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-auto font-bold ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'} text-white`}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hosting;
