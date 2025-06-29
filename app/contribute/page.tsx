import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribute to Macwrite - Join Our Open Source Community',
  description: 'Learn how to contribute to Macwrite, an open-source writing application for Mac. Find contribution guidelines, project structure, and how to get started.',
};

export default function ContributePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contribute to Macwrite</h1>
        <p className="text-xl text-muted-foreground">Join our community and help build the future of writing on Mac</p>
      </div>
      
      {/* Project Screenshot */}
      <div className="my-10 rounded-xl overflow-hidden shadow-2xl border border-border">
        <div className="bg-secondary/30 p-2 border-b border-border flex items-center">
          <div className="flex gap-2 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mx-auto text-sm text-muted-foreground">Macwrite Editor</div>
        </div>
        <div className="relative aspect-video w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="h-2 w-24 bg-muted rounded"></div>
              </div>
              <div className="flex-1 flex gap-4">
                <div className="w-1/4 bg-muted/50 rounded"></div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-2 w-full bg-muted/70 rounded"></div>
                  <div className="h-2 w-5/6 bg-muted/70 rounded"></div>
                  <div className="h-2 w-4/6 bg-muted/70 rounded"></div>
                  <div className="h-2 w-full bg-muted/70 rounded"></div>
                  <div className="h-2 w-3/6 bg-muted/70 rounded"></div>
                  <div className="h-2 w-full bg-muted/70 rounded"></div>
                  <div className="h-2 w-5/6 bg-muted/70 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p>
            Macwrite is a private open-source project that welcomes contributors who are passionate about 
            creating exceptional writing experiences for Mac users. To get started, you'll need to request access to the source code.
          </p>
          
          <div className="bg-secondary/30 p-6 rounded-lg my-6 border border-border">
            <h3 className="text-xl font-semibold mb-2">Request Access</h3>
            <p className="mb-4">To contribute to Macwrite, please contact us through one of the following channels:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <a href="https://linkedin.com/in/gokula-krishnan-r-50a306243" target="_blank" rel="noopener noreferrer" 
                   className="text-blue-500 hover:underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:gokulakrishnanr812@gmail.com" className="text-blue-500 hover:underline">
                  Email: gokulakrishnanr812@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Project Structure</h2>
          <p>
            Macwrite is built using modern web technologies and follows a clean, modular architecture:
          </p>
          
          <div className="bg-secondary/20 p-4 rounded-md my-4 overflow-auto">
            <pre className="text-sm">
{`macwrite/
  ├── app/               # Next.js app directory
  │   ├── components/    # UI components
  │   ├── docs/          # Documentation pages
  │   ├── pricing/       # Pricing information
  │   └── releases/      # Release notes
  ├── components/        # Shared components
  │   ├── magicui/       # UI effects and animations
  │   └── ui/            # Base UI components
  ├── lib/               # Utility functions
  └── public/            # Static assets`}
            </pre>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contribution Guidelines</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Code Style</h3>
          <p>
            We follow a consistent code style throughout the project:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use TypeScript for type safety</li>
            <li>Follow the component structure established in the codebase</li>
            <li>Use Tailwind CSS for styling</li>
            <li>Write clean, documented, and tested code</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Pull Request Process</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Fork the repository and create your branch from <code>main</code></li>
            <li>Make your changes and test thoroughly</li>
            <li>Update documentation as needed</li>
            <li>Submit a pull request with a clear description of the changes</li>
            <li>Address any feedback from code reviews</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Feature Roadmap</h2>
          <p>
            We're currently focusing on the following areas for improvement:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-secondary/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">UI Enhancements</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Dark mode improvements</li>
                <li>Custom themes support</li>
                <li>Responsive design refinements</li>
              </ul>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Performance Optimization</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Startup time reduction</li>
                <li>Memory usage optimization</li>
                <li>Battery efficiency improvements</li>
              </ul>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">New Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>AI-powered writing suggestions</li>
                <li>Advanced export options</li>
                <li>Collaboration tools</li>
              </ul>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>API documentation</li>
                <li>Developer guides</li>
                <li>User tutorials</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Development Setup</h2>
          
          <p className="mb-4">Once you have access to the repository, follow these steps to set up your development environment:</p>
          
          <div className="bg-secondary/20 p-4 rounded-md my-4 overflow-auto">
            <pre className="text-sm">
{`# Clone the repository
git clone https://github.com/yourusername/macwrite.git

# Navigate to the project directory
cd macwrite

# Install dependencies
npm install

# Start the development server
npm run dev`}
            </pre>
          </div>
          
          <p>
            The development server will start at <code>http://localhost:3000</code>, where you can preview your changes in real-time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact & Support</h2>
          <p>
            If you have any questions or need assistance with your contributions, please don't hesitate to reach out:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <strong>Technical Questions:</strong> Email our dev team at <a href="mailto:gokulakrishnanr812@gmail.com" className="text-blue-500 hover:underline">gokulakrishnanr812@gmail.com</a>
            </li>
            <li>
              <strong>General Inquiries:</strong> Contact us at <a href="mailto:gokulakrishnanr812@gmail.com" className="text-blue-500 hover:underline">gokulakrishnanr812@gmail.com</a>
            </li>
          </ul>
          
          <div className="mt-8 text-center">
            <p className="font-medium">Thank you for your interest in contributing to Macwrite!</p>
            <p className="text-muted-foreground">Together, we're building the future of writing on Mac.</p>
          </div>
        </section>
      </div>
    </div>
  );
} 