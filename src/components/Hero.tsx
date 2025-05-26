
import { Button } from "@/components/ui/button";
import { ArrowDown, Rocket, Shield, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23475569\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Transform Your Digital Presence
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              We craft fast, modern sites that impress customers and fuel your growth. 
              Get a professional online presence that delivers results.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start Your Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-600 text-blue-600 hover:bg-slate-800 hover:text-blue-400 px-8 py-4 text-lg rounded-lg"
            >
              View Our Work
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center group h-full">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                <Shield className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure & Fast</h3>
                <p className="text-slate-400 flex-grow">SSL security, DDOS protection, and lightning-fast performance included</p>
              </div>
            </div>
            
            <div className="text-center group h-full">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                <Star className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                <p className="text-slate-400 flex-grow">Professional designs that build credibility and convert visitors</p>
              </div>
            </div>
            
            <div className="text-center group h-full">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                <Rocket className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quick Launch</h3>
                <p className="text-slate-400 flex-grow">From concept to live site in days, not months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-slate-400" />
      </div>
    </section>
  );
};

export default Hero;
