import React from 'react';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Hello from Docusaurus`}
      description="Description will go into a meta tag in <head />">
      <main>
        <h1>Hello Docusaurus</h1>
      </main>
    </Layout>
  );
}
