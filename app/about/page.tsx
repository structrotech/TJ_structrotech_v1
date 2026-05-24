"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb, Users, Shield } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Simplified Learning",
    description: "We break down complex topics into digestible, easy-to-understand content.",
  },
  {
    icon: Target,
    title: "Structured Approach",
    description: "Our content follows a logical progression to help you build knowledge effectively.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We listen to our learners and create content based on real-world needs.",
  },
  {
    icon: Heart,
    title: "Passion for Teaching",
    description: "Our team is passionate about sharing knowledge and helping others grow.",
  },
  {
    icon: Shield,
    title: "Quality Content",
    description: "Every article is carefully researched and reviewed for accuracy.",
  },
  {
    icon: Eye,
    title: "Practical Focus",
    description: "We emphasize hands-on learning with real-world examples and projects.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 w-full">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-foreground mb-4">
            About StructroTech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe that quality tech education should be accessible to everyone. Our mission is to provide clear, structured, and practical learning resources for aspiring developers and IT professionals.
          </p>
        </motion.section>

        {/* Vision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/10">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To become the go-to platform for structured technology education, empowering millions of learners worldwide to master AI, Cybersecurity, Linux, Cloud Computing, and more. We envision a world where anyone, regardless of background, can acquire the skills needed to thrive in the tech industry.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
              >
                <div className="p-2 rounded-xl bg-primary/10 w-fit mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Explore our categories and begin your journey to mastering technology.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              Start Learning
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
