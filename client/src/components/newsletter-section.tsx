import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterSection() {
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to QuillSpace. You'll receive our best stories weekly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="section-spacing relative curve-bottom">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-chart-2/20"></div>
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200" 
          alt="Creative workspace" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto container-padding text-center">
        <div className="glass rounded-3xl p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-full">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-shadow">
            Stay Inspired
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Get the best stories, writing tips, and creative insights delivered to your inbox every week. 
            Join over 50,000 writers and readers who never miss our curated content.
          </p>
          
          {isSubscribed ? (
            <div className="glass rounded-2xl p-8 mb-8 border border-green-500/20">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-500">Welcome to QuillSpace!</h3>
              <p className="text-muted-foreground">
                Thank you for subscribing. Check your inbox for a welcome message and our latest featured stories.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input 
                            {...field}
                            type="email" 
                            placeholder="Enter your email" 
                            className="bg-secondary/50 rounded-full px-6 py-3 text-foreground placeholder-muted-foreground border-border/50 focus:border-primary/50 transition-colors h-12"
                            data-testid="input-newsletter-email"
                          />
                        </FormControl>
                        <FormMessage className="text-left mt-2" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 hover-lift px-8 py-3 rounded-full h-12"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-subscribe"
                  >
                    {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          <p className="text-sm text-muted-foreground mb-8">
            No spam, unsubscribe at any time. We respect your privacy and will never share your email.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors text-xl p-2 rounded-full hover:bg-primary/10"
              data-testid="link-twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-chart-3 transition-colors text-xl p-2 rounded-full hover:bg-chart-3/10"
              data-testid="link-instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.295C3.95 14.724 3.577 13.498 3.577 12c0-1.297.372-2.522 1.05-3.693.875-.805 2.026-1.295 3.323-1.295s2.448.49 3.323 1.295c.677 1.171 1.049 2.396 1.049 3.693 0 1.498-.372 2.724-1.049 3.693-.875.805-2.026 1.295-3.323 1.295zm7.068 0c-1.297 0-2.448-.49-3.323-1.295-.677-.969-1.049-2.195-1.049-3.693 0-1.297.372-2.522 1.049-3.693.875-.805 2.026-1.295 3.323-1.295s2.448.49 3.323 1.295c.677 1.171 1.049 2.396 1.049 3.693 0 1.498-.372 2.724-1.049 3.693-.875.805-2.026 1.295-3.323 1.295z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-chart-1 transition-colors text-xl p-2 rounded-full hover:bg-chart-1/10"
              data-testid="link-linkedin"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-chart-4 transition-colors text-xl p-2 rounded-full hover:bg-chart-4/10"
              data-testid="link-medium"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span>50K+ subscribers</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span>Weekly delivery</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span>Curated content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
