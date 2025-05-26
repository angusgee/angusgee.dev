
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Phone } from "lucide-react";

const CTA = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Online Presence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Take the first step towards accelerating your growth. Book your complimentary discovery call today 
              and let's discuss how we can elevate your digital presence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="text-blue-200 text-sm">
              <p>No obligation • Free consultation • Quick response</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
