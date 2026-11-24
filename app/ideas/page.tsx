import Link from 'next/link';
import archive from '@/content/linkedin-posts.json';

export const metadata = {
  title: 'Ideas & Perspectives | Hitesh Vishwakarma',
  description: 'Notes on product thinking, fintech, operations and technology by Hitesh Vishwakarma.'
};

export default function IdeasPage() {
  const posts = [...archive.posts].sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return <main className="ideas-page">
    <header className="bond-topbar"><Link href="/" className="bond-wordmark">HITESH<span>.</span></Link><nav><Link href="/">Portfolio</Link><Link href="/#contact">Contact</Link></nav></header>
    <div className="bond-wrap">
      <div className="bond-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Ideas & Perspectives</span></div>
      <section className="ideas-intro"><p className="bond-eyebrow">FIELD NOTES / PRODUCT · PEOPLE · SYSTEMS</p><h1>Ideas &<br/><em>Perspectives.</em></h1><p>A living archive of things I’m learning, questioning and thinking through. Originally published on LinkedIn.</p></section>
      {posts.length ? <section className="ideas-list">{posts.map((post: any) => <article className="ideas-card" key={post.id}>
        <div className="ideas-card-meta"><span>{post.category || 'PERSPECTIVE'}</span><time>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : ''}</time></div>
        <div className="ideas-copy">{post.text}</div>
        <a className="ideas-original" href={post.url} target="_blank" rel="noopener noreferrer">Read original on LinkedIn ↗</a>
        {post.embedUrl ? <div className="ideas-embed"><iframe src={post.embedUrl} title="Original LinkedIn post" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div> : null}
      </article>)}</section> : <section className="ideas-empty"><p className="bond-eyebrow">THE FIRST NOTE IS ON ITS WAY</p><h2>Good thinking deserves a place to live.</h2><p>New writing will appear here after it is published on LinkedIn and added to the archive.</p><a className="ideas-original" href="https://www.linkedin.com/in/hiteshvish/" target="_blank" rel="noopener noreferrer">Find me on LinkedIn ↗</a></section>}
      <footer className="bond-footer"><span>HITESH VISHWAKARMA · IDEAS & PERSPECTIVES</span><Link href="/">Back to portfolio ↗</Link></footer>
    </div>
  </main>;
}
