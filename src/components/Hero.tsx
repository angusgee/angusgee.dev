
import { Button } from "@/components/ui/button";
import { ArrowDown, Rocket, Shield, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23475569%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Fast <br/> Modern <br/> Websites
            </h1>
            <p className="text-xl md:text-xl text-slate-300 mb-8 leading-relaxed">
              Create a blazingly fast, modern web presence that impresses customers and fuels growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-delay">
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-600 text-slate-900 font-bold hover:bg-slate-800 hover:text-blue-400 px-8 py-4 text-lg rounded-lg"
            >
              Start Your Project
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center group h-full">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
              <Rocket className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quick Launch</h3>
                <p className="text-slate-400 flex-grow">From concept to live site in days, not months</p>
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
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure & Fast</h3>
                <p className="text-slate-400 flex-grow">SSL security, DDOS protection, and lightning-fast performance included</p>
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
