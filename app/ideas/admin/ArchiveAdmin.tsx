'use client';
import {useEffect,useState} from 'react';

type Post={id:string;text:string;url:string;category:string;publishedAt:string;embedUrl?:string};
const blank=():Post=>({id:'',text:'',url:'',category:'Product thinking',publishedAt:new Date().toISOString().slice(0,10),embedUrl:''});
const categories=['Product thinking','Fintech','Operations','AI & technology','Business','Personal perspectives'];

export default function ArchiveAdmin(){
  const [password,setPassword]=useState('');
  const [logged,setLogged]=useState(false);
  const [posts,setPosts]=useState<Post[]>([]);
  const [draft,setDraft]=useState<Post>(blank());
  const [editing,setEditing]=useState('');
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');
  const [error,setError]=useState('');
  async function request(action:string,body:any={}){const response=await fetch('/api/ideas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...body})});const data=await response.json();if(!response.ok)throw new Error(data.error||'Something went wrong.');return data;}
  async function load(){const response=await fetch('/api/ideas',{cache:'no-store'});if(!response.ok){const data=await response.json();throw new Error(data.error||'Please sign in again.');}const data=await response.json();setPosts(data.posts||[]);setLogged(true);}
  useEffect(()=>{load().catch(()=>{});},[]);
  async function login(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');try{await request('login',{password});await load();setPassword('');}catch(e:any){setError(e.message);}finally{setBusy(false);}}
  function edit(post:Post){setDraft({...post});setEditing(post.id);setMessage('');}
  function reset(){setDraft(blank());setEditing('');}
  function addPost(e:React.FormEvent){e.preventDefault();setError('');if(!/^https:\/\/(www\.)?linkedin\.com\/(posts\/|feed\/update\/)/i.test(draft.url)){setError('Use the URL of your published LinkedIn post.');return;}if(draft.embedUrl&&!/^https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:/i.test(draft.embedUrl)){setError('Paste only the iframe URL from LinkedIn’s official Embed this post option.');return;}const item={...draft,id:editing||crypto.randomUUID(),publishedAt:draft.publishedAt?new Date(draft.publishedAt+'T12:00:00').toISOString():new Date().toISOString()};setPosts(current=>editing?current.map(p=>p.id===editing?item:p):[item,...current]);reset();setMessage('Draft updated locally. Select Save archive to publish it.');}
  async function save(){setBusy(true);setError('');setMessage('');try{await request('save',{posts});setMessage('Archive saved to GitHub main. Your website will update after the production deployment completes.');}catch(e:any){setError(e.message);}finally{setBusy(false);}}
  async function logout(){try{await request('logout');}finally{setLogged(false);setPosts([]);}}
  if(!logged)return <section className="ideas-admin-panel"><div className="ideas-admin-heading"><p className="bond-eyebrow">AUTHENTICATED ACCESS</p><h2>Private publisher</h2><p>Sign in with the archive password configured in Vercel. No LinkedIn login or permissions are used.</p></div><form className="ideas-login" onSubmit={login}><label className="ideas-field">Archive password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required /></label><button className="ideas-button" disabled={busy}>{busy?'Signing in…':'Sign in ↗'}</button></form>{error?<p className="ideas-error">{error}</p>:null}<p className="ideas-help">First-time setup is required: configure GITHUB_TOKEN, ARCHIVE_ADMIN_PASSWORD and ARCHIVE_SESSION_SECRET in Vercel Project Settings → Environment Variables, then redeploy.</p></section>;
  return <section className="ideas-admin-panel">
    <div className="ideas-admin-toolbar"><div><p className="bond-eyebrow">ARCHIVE MANAGER</p><h2>{posts.length} saved {posts.length===1?'post':'posts'}</h2></div><button className="ideas-quiet-button" onClick={logout}>Sign out</button></div>
    <form className="ideas-editor" onSubmit={addPost}><div className="ideas-editor-title"><h3>{editing?'Edit archive entry':'Add a published post'}</h3><span>LinkedIn stays your publishing home.</span></div>
      <label className="ideas-field">Original LinkedIn post URL<input type="url" value={draft.url} onChange={e=>setDraft({...draft,url:e.target.value})} placeholder="https://www.linkedin.com/posts/…" required /></label>
      <label className="ideas-field">Your original post text<textarea value={draft.text} onChange={e=>setDraft({...draft,text:e.target.value})} rows={7} maxLength={12000} placeholder="Paste the text you published on LinkedIn…" required /></label>
      <div className="ideas-form-grid"><label className="ideas-field">Topic<select value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label className="ideas-field">Publication date<input type="date" value={draft.publishedAt.slice(0,10)} onChange={e=>setDraft({...draft,publishedAt:e.target.value})} required /></label></div>
      <label className="ideas-field">Official LinkedIn embed URL <span className="ideas-field-note">Optional. On LinkedIn, open the post menu → Embed this post → copy the iframe src URL. Do not paste arbitrary HTML.</span><input type="url" value={draft.embedUrl||''} onChange={e=>setDraft({...draft,embedUrl:e.target.value})} placeholder="https://www.linkedin.com/embed/feed/update/urn:li:…" /></label>
      <div className="ideas-editor-actions"><button className="ideas-button" type="submit">{editing?'Update entry':'Add to list'} ↗</button>{editing?<button type="button" className="ideas-quiet-button" onClick={reset}>Cancel edit</button>:null}</div>
    </form>
    <div className="ideas-post-manager"><h3>Pending archive contents</h3>{posts.length?posts.map(post=><article className="ideas-post-row" key={post.id}><div><span>{post.category} · {new Date(post.publishedAt).toLocaleDateString('en-IN')}</span><p>{post.text.slice(0,180)}{post.text.length>180?'…':''}</p><a href={post.url} target="_blank" rel="noreferrer">Original LinkedIn post ↗</a></div><div className="ideas-row-actions"><button onClick={()=>edit(post)}>Edit</button><button onClick={()=>setPosts(current=>current.filter(p=>p.id!==post.id))}>Remove</button></div></article>):<p className="ideas-help">Your archive is empty. Add a post above after publishing it on LinkedIn.</p>}</div>
    <div className="ideas-save-bar"><div><strong>Ready to publish?</strong><span>Saving creates a commit directly on GitHub main.</span></div><button className="ideas-button" disabled={busy} onClick={save}>{busy?'Saving…':'Save archive to website ↗'}</button></div>
    {message?<p className="ideas-success">{message}</p>:null}{error?<p className="ideas-error">{error}</p>:null}
  </section>;
}
