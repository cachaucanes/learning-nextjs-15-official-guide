import Link from "next/link";
import Image from "next/image";
import AcmeLogo from "../ui/acme-logo";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 p-6">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center text-white">
            <AcmeLogo />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Acme</h1>
            <p className="text-xl opacity-90">
              We&apos;re building the future of digital experiences. Learn about
              our mission, values, and the team behind Acme.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-12 px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-gray-600 mb-4">
              Founded in 2015, Acme began with a simple mission: to create
              powerful, intuitive software that helps businesses thrive in the
              digital age.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small team of passionate developers has grown
              into a global company serving thousands of customers across
              various industries. Our journey has been defined by innovation,
              customer-centricity, and a relentless pursuit of excellence.
            </p>
            <p className="text-gray-600">
              Today, we&apos;re proud to be at the forefront of technological
              advancement, continuously pushing boundaries and setting new
              standards in the industry.
            </p>
          </div>
          <div className="relative h-[300px] md:h-auto rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Acme office"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Acme, from product
              development to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description:
                  "We constantly explore new ideas and technologies to create cutting-edge solutions.",
              },
              {
                title: "Integrity",
                description:
                  "We operate with honesty, transparency, and ethical standards in all our interactions.",
              },
              {
                title: "Customer Focus",
                description:
                  "Our customers' success is our success. We listen, adapt, and deliver exceptional experiences.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-blue-600">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Acme by the Numbers</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "5,000+", label: "Happy Customers" },
              { value: "50+", label: "Team Members" },
              { value: "20+", label: "Countries Served" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of businesses that trust Acme to power their digital
            experiences.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Us <ArrowRightCircleIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-black-400 mb-4 md:mb-0">
              <AcmeLogo className="text-black" />
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Acme Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
