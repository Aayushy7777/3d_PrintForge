import React from 'react';

const About = () => {
  return (
    <main className="container mx-auto px-4 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1>About PrintForge</h1>
        <p>
          PrintForge is a premium 3D printing service dedicated to helping creators,
          engineers, and businesses bring their ideas to life. We focus on precision,
          quality materials, and friendly support so your prototypes and products look
          and perform their best.
        </p>
        <h2>What we do</h2>
        <p>
          From prototyping to small-batch production, we offer a range of materials
          and finishes to match your project's needs. Upload a design, choose your
          material, and we'll handle the rest — including post-processing and
          shipping.
        </p>
        <h2>Get in touch</h2>
        <p>
          Questions? Email us at <a href="mailto:hello@printforge.com">hello@printforge.com</a>
          or visit our contact page for more ways to reach us.
        </p>
      </div>
    </main>
  );
};

export default About;
