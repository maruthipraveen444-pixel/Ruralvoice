// ===== STATE =====
let currentUser = null;
let loginRole = 'villager';
let regRole = 'villager';
let villFilter = 'all';
let offFilter = 'all';
let annFilter = 'all';

const DB = {
  users: [
    {id:1,fname:'Ravi',lname:'Kumar',email:'villager@demo.in',pass:'pass123',role:'villager',village:'Rampur',district:'Varanasi',phone:'+91 98765 43210',joined:'June 2024'},
    {id:2,fname:'Priya',lname:'Sharma',email:'official@demo.in',pass:'pass123',role:'official',dept:'Public Works',village:'',district:'Varanasi',phone:'+91 87654 32109',joined:'Jan 2024'},
    {id:3,fname:'Admin',lname:'User',email:'admin@demo.in',pass:'pass123',role:'admin',village:'',district:'',phone:'',joined:'Jan 2023'},
    {id:4,fname:'Sunita',lname:'Devi',email:'sunita@demo.in',pass:'pass123',role:'villager',village:'Lalganj',district:'Varanasi',phone:'+91 76543 21098',joined:'March 2024'},
    {id:5,fname:'Ramesh',lname:'Yadav',email:'ramesh@demo.in',pass:'pass123',role:'villager',village:'Rampur',district:'Varanasi',phone:'+91 65432 10987',joined:'April 2024'},
  ],
  complaints: [
    {id:'RV001',userId:1,name:'Ravi Kumar',title:'Broken road near market',cat:'Roads & Infrastructure',priority:'Urgent',loc:'Main Market Road',desc:'The road has deep potholes since 3 months. 2 accidents already.',status:'In Progress',date:'2024-06-01',response:'Work order issued. Repair to start within 7 days.'},
    {id:'RV002',userId:1,name:'Ravi Kumar',title:'No water supply for 5 days',cat:'Water Supply',priority:'Urgent',loc:'Ward 3',desc:'Entire ward 3 has no water. Pipe burst near temple.',status:'Resolved',date:'2024-05-25',response:'Pipe repaired. Water restored on 28 May.'},
    {id:'RV003',userId:1,name:'Ravi Kumar',title:'Street lights not working',cat:'Electricity',priority:'Normal',loc:'East Side',desc:'6 street lights out for 2 weeks. Safety concern at night.',status:'Pending',date:'2024-06-08',response:''},
    {id:'RV004',userId:1,name:'Ravi Kumar',title:'School roof leaking',cat:'Education',priority:'Normal',loc:'Primary School',desc:'Roof leaks during rain. Students cannot attend class.',status:'In Progress',date:'2024-06-10',response:'Inspection done. Repair scheduled for June 20.'},
    {id:'RV005',userId:4,name:'Sunita Devi',title:'Garbage not collected',cat:'Sanitation',priority:'Normal',loc:'Ward 5',desc:'Garbage has not been collected for 10 days.',status:'Pending',date:'2024-06-11',response:''},
    {id:'RV006',userId:5,name:'Ramesh Yadav',title:'Drainage overflow',cat:'Sanitation',priority:'Urgent',loc:'Near School',desc:'Drainage overflowing into road. Health hazard.',status:'In Progress',date:'2024-06-12',response:'Team dispatched for inspection.'},
    {id:'RV007',userId:4,name:'Sunita Devi',title:'No electricity for 2 days',cat:'Electricity',priority:'Urgent',loc:'Colony B',desc:'Power outage affecting entire colony.',status:'Pending',date:'2024-06-14',response:''},
    {id:'RV008',userId:5,name:'Ramesh Yadav',title:'Irrigation canal blocked',cat:'Agriculture',priority:'Normal',loc:'Fields near highway',desc:'Canal blocked by debris. Crops at risk.',status:'Resolved',date:'2024-05-30',response:'Canal cleared on June 2.'},
  ],
  announcements: [
    {id:'A001',title:'PM Kisan Samman Nidhi — New Instalment',dept:'Agriculture',body:'The 17th instalment of PM-KISAN scheme has been released. Eligible farmers with registered accounts will receive ₹2,000 directly. Visit your nearest CSC centre if not received within 3 days.',by:'Priya Sharma',date:'2024-06-10'},
    {id:'A002',title:'Free Health Camp — 20 June 2024',dept:'Health',body:'A free health check-up camp will be held at Gram Panchayat Hall. Services include blood pressure, sugar, eye check, and dental check-up. All villagers are encouraged to attend from 9AM–3PM.',by:'Priya Sharma',date:'2024-06-09'},
    {id:'A003',title:'Road Repair Work — Sector 4',dept:'Public Works',body:'Repair of the main road in Sector 4 will commence on June 16. Work is expected to complete in 30 days. Minor traffic disruptions expected during work hours (9AM–5PM).',by:'Priya Sharma',date:'2024-06-08'},
    {id:'A004',title:'Primary School Scholarship Applications',dept:'Education',body:'Applications open for District Merit Scholarship 2024. Students scoring above 80% in Class 8 board exams are eligible. Submit applications at the Block Education Office by June 30.',by:'Priya Sharma',date:'2024-06-05'},
    {id:'A005',title:'Household Survey for New Well',dept:'Public Works',body:'A survey will be conducted this week to identify localities for a new community well. Households in areas lacking water access should register their names at the Panchayat office.',by:'Priya Sharma',date:'2024-06-03'},
  ]
};

// ===== NAVIGATION =====
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pg = document.getElementById('page-'+name);
  if(pg) pg.classList.add('active');
  document.querySelectorAll('.nav-links button').forEach(b=>b.classList.remove('active'));
  if(name==='home') document.getElementById('navHome').classList.add('active');
  if(name==='announcements'){document.getElementById('navAnn').classList.add('active'); renderAnnouncements();}
  if(name==='villager') renderVillagerDashboard();
  if(name==='official') renderOfficialDashboard();
  if(name==='admin') renderAdminDashboard();
  window.scrollTo(0,0);
}

// ===== AUTH =====
function setRole(r,el){
  regRole=r;
  document.querySelectorAll('#page-register .role-tab').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('dept-group').style.display = r==='official'?'block':'none';
}
function setLoginRole(r,el){
  loginRole=r;
  document.querySelectorAll('#page-login .role-tab').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
}

function doRegister(){
  const fname=document.getElementById('reg-fname').value.trim();
  const lname=document.getElementById('reg-lname').value.trim();
  const email=document.getElementById('reg-email').value.trim();
  const pass=document.getElementById('reg-pass').value;
  const village=document.getElementById('reg-village').value.trim();
  const district=document.getElementById('reg-district').value.trim();
  const phone=document.getElementById('reg-phone').value.trim();
  const dept=document.getElementById('reg-dept').value;
  const al=document.getElementById('reg-alert');
  if(!fname||!lname||!email||!pass||!village){
    al.className='alert error'; al.textContent='Please fill all required fields.'; return;
  }
  if(DB.users.find(u=>u.email===email)){
    al.className='alert error'; al.textContent='Email already registered.'; return;
  }
  const newUser={id:DB.users.length+1,fname,lname,email,pass,role:regRole,village,district,phone,dept,joined:'June 2024'};
  DB.users.push(newUser);
  loginAs(newUser);
  showToast('Account created! Welcome to Rural Voice 🌾');
}

function doLogin(){
  const email=document.getElementById('login-email').value.trim();
  const pass=document.getElementById('login-pass').value;
  const al=document.getElementById('login-alert');
  const user=DB.users.find(u=>u.email===email&&u.pass===pass);
  if(!user){al.className='alert error';al.textContent='Invalid email or password.';return;}
  loginAs(user);
  showToast(`Welcome back, ${user.fname}! 👋`);
}

function loginAs(user){
  currentUser=user;
  document.getElementById('guestNav').style.display='none';
  document.getElementById('userNav').style.display='flex';
  document.getElementById('navAvatar').textContent=(user.fname[0]+(user.lname||'')[0]||'').toUpperCase();
  document.getElementById('navName').textContent=user.fname;
  if(user.role==='villager') showPage('villager');
  else if(user.role==='official') showPage('official');
  else showPage('admin');
}

function logout(){
  currentUser=null;
  document.getElementById('guestNav').style.display='flex';
  document.getElementById('userNav').style.display='none';
  showPage('home');
  showToast('Logged out successfully.');
}

// ===== VILLAGER DASHBOARD =====
function renderVillagerDashboard(){
  if(!currentUser) return;
  const myComp=DB.complaints.filter(c=>c.userId===currentUser.id);
  document.getElementById('vill-greeting').textContent=`Good day, ${currentUser.fname} 👋`;
  document.getElementById('vd-total').textContent=myComp.length;
  document.getElementById('vd-pending').textContent=myComp.filter(c=>c.status==='Pending').length;
  document.getElementById('vd-progress').textContent=myComp.filter(c=>c.status==='In Progress').length;
  document.getElementById('vd-resolved').textContent=myComp.filter(c=>c.status==='Resolved').length;
  document.getElementById('prof-name').textContent=currentUser.fname+' '+currentUser.lname;
  document.getElementById('prof-email').textContent=currentUser.email;
  document.getElementById('prof-avatar').textContent=(currentUser.fname[0]+(currentUser.lname||'')[0]||'').toUpperCase();
  document.getElementById('prof-village').textContent=currentUser.village||'—';
  document.getElementById('prof-district').textContent=currentUser.district||'—';
  renderVillComplaints(myComp);
  switchTab('my-complaints','vill');
}

function renderVillComplaints(list){
  const search=(document.getElementById('vill-search').value||'').toLowerCase();
  const filtered=list.filter(c=>{
    const matchStatus=villFilter==='all'||c.status===villFilter;
    const matchSearch=!search||c.title.toLowerCase().includes(search)||c.cat.toLowerCase().includes(search);
    return matchStatus&&matchSearch;
  });
  const tbody=document.getElementById('vill-complaint-tbody');
  if(!filtered.length){tbody.innerHTML=`<tr><td colspan="6" style="text-align:center;color:#888780;padding:2rem">No complaints found.</td></tr>`;return;}
  tbody.innerHTML=filtered.map(c=>`
    <tr>
      <td style="font-size:11px;color:#888780">${c.id}</td>
      <td style="font-weight:600;color:#173404">${c.title}</td>
      <td>${c.cat}</td>
      <td style="color:#888780">${c.date}</td>
      <td><span class="badge ${c.status.toLowerCase().replace(' ','')}">${c.status}</span>${c.priority==='Urgent'?'<span class="badge urgent" style="margin-left:4px">Urgent</span>':''}</td>
      <td><button class="respond-btn" onclick="viewComplaint('${c.id}')">View</button></td>
    </tr>`).join('');
}

function filterVillComplaints(){
  const myComp=DB.complaints.filter(c=>c.userId===(currentUser&&currentUser.id));
  renderVillComplaints(myComp);
}
function setVillFilter(f,el){
  villFilter=f;
  document.querySelectorAll('#my-complaints .filter-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  filterVillComplaints();
}

// ===== COMPLAINT DETAIL MODAL =====
function viewComplaint(id){
  const c=DB.complaints.find(x=>x.id===id);
  if(!c) return;
  const col=c.status==='Resolved'?'resolved':c.status==='In Progress'?'inprogress':'pending';
  document.getElementById('modalContent').innerHTML=`
    <button class="close-btn" onclick="closeModal()">✕</button>
    <h3>${c.title}</h3>
    <p style="font-size:12px;color:#888780;margin-top:3px">Filed on ${c.date} &nbsp;|&nbsp; ID: ${c.id}</p>
    <hr class="divider"/>
    <div style="display:grid;gap:8px;font-size:13px">
      <div style="display:flex;gap:8px"><span style="color:#888780;min-width:90px">Category</span><strong>${c.cat}</strong></div>
      <div style="display:flex;gap:8px"><span style="color:#888780;min-width:90px">Priority</span><span class="badge ${c.priority==='Urgent'?'urgent':'pending'}">${c.priority}</span></div>
      <div style="display:flex;gap:8px"><span style="color:#888780;min-width:90px">Status</span><span class="badge ${col}">${c.status}</span></div>
      <div style="display:flex;gap:8px"><span style="color:#888780;min-width:90px">Location</span><span>${c.loc}</span></div>
    </div>
    <hr class="divider"/>
    <p style="font-size:13px;font-weight:600;color:#173404;margin-bottom:5px">Description</p>
    <p style="font-size:13px;color:#444441;line-height:1.6">${c.desc}</p>
    ${c.response?`<hr class="divider"/>
    <p style="font-size:13px;font-weight:600;color:#3B6D11;margin-bottom:5px">Official Response</p>
    <p style="font-size:13px;color:#444441;line-height:1.6;background:#EAF3DE;padding:10px 12px;border-radius:7px">${c.response}</p>`:''}
  `;
  document.getElementById('modalBg').classList.add('open');
}

// ===== OFFICIAL DASHBOARD =====
function renderOfficialDashboard(){
  if(!currentUser) return;
  document.getElementById('off-dept-label').textContent=(currentUser.dept||'Government')+ ' Department';
  document.getElementById('od-total').textContent=DB.complaints.length;
  document.getElementById('od-pending').textContent=DB.complaints.filter(c=>c.status==='Pending').length;
  document.getElementById('od-prog').textContent=DB.complaints.filter(c=>c.status==='In Progress').length;
  document.getElementById('od-res').textContent=DB.complaints.filter(c=>c.status==='Resolved').length;
  renderOfficialComplaints();
  renderOffAnnouncements();
  switchTab('off-complaints','off');
}

function renderOfficialComplaints(){
  let list=DB.complaints;
  if(offFilter!=='all') list=list.filter(c=>offFilter==='Urgent'?c.priority==='Urgent':c.status===offFilter);
  const tbody=document.getElementById('off-complaint-tbody');
  tbody.innerHTML=list.map(c=>`
    <tr>
      <td style="font-size:11px;color:#888780">${c.id}</td>
      <td style="font-size:12px">${c.name}</td>
      <td style="font-weight:600;color:#173404;font-size:13px">${c.title}</td>
      <td style="font-size:12px">${c.cat}</td>
      <td><span class="badge ${c.priority==='Urgent'?'urgent':'resolved'}">${c.priority}</span></td>
      <td>
        <select class="status-select" onchange="updateStatus('${c.id}',this.value)">
          <option ${c.status==='Pending'?'selected':''}>Pending</option>
          <option ${c.status==='In Progress'?'selected':''}>In Progress</option>
          <option ${c.status==='Resolved'?'selected':''}>Resolved</option>
        </select>
      </td>
      <td><button class="respond-btn" onclick="openRespondModal('${c.id}')">Respond</button></td>
    </tr>`).join('');
}

function setOffFilter(f,el){
  offFilter=f;
  document.querySelectorAll('#off-complaints .filter-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  renderOfficialComplaints();
}

function updateStatus(id,newStatus){
  const c=DB.complaints.find(x=>x.id===id);
  if(c){c.status=newStatus; showToast('Status updated to: '+newStatus);}
  renderOfficialDashboard();
  if(currentUser&&currentUser.role==='villager') renderVillagerDashboard();
}

function renderOffAnnouncements(){
  const tbody=document.getElementById('off-ann-tbody');
  const myAnns=DB.announcements.filter(a=>a.by===(currentUser&&currentUser.fname+' '+currentUser.lname));
  if(!myAnns.length){tbody.innerHTML=`<tr><td colspan="4" style="text-align:center;color:#888780;padding:2rem">No announcements posted yet.</td></tr>`;return;}
  tbody.innerHTML=myAnns.map(a=>`
    <tr>
      <td style="font-weight:600;color:#173404">${a.title}</td>
      <td><span class="badge villager">${a.dept}</span></td>
      <td style="color:#888780">${a.date}</td>
      <td><button class="respond-btn" style="background:#FCEBEB;color:#A32D2D;border-color:#F7C1C1" onclick="deleteAnn('${a.id}')">Delete</button></td>
    </tr>`).join('');
}

function deleteAnn(id){
  const idx=DB.announcements.findIndex(a=>a.id===id);
  if(idx>-1){DB.announcements.splice(idx,1);showToast('Announcement deleted.');}
  renderOffAnnouncements();
  document.getElementById('ad-ann-num').textContent=DB.announcements.length;
}

// ===== RESPOND MODAL =====
function openRespondModal(id){
  const c=DB.complaints.find(x=>x.id===id);
  if(!c) return;
  document.getElementById('modalContent').innerHTML=`
    <button class="close-btn" onclick="closeModal()">✕</button>
    <h3>Respond to Complaint</h3>
    <p style="font-size:12px;color:#888780;margin-top:3px">${c.id}: ${c.title}</p>
    <hr class="divider"/>
    <p style="font-size:13px;color:#888780;margin-bottom:.5rem">Current response:</p>
    <p style="font-size:13px;color:#444441;background:#f8faf5;padding:10px;border-radius:6px;margin-bottom:1rem">${c.response||'No response yet.'}</p>
    <div class="form-group"><label>Your Response</label><textarea id="off-resp-text" placeholder="Enter your official response..." style="min-height:100px">${c.response||''}</textarea></div>
    <button class="btn-full" onclick="saveResponse('${id}')">Save Response</button>
  `;
  document.getElementById('modalBg').classList.add('open');
}

function saveResponse(id){
  const text=document.getElementById('off-resp-text').value.trim();
  const c=DB.complaints.find(x=>x.id===id);
  if(c&&text){c.response=text;if(c.status==='Pending')c.status='In Progress';}
  closeModal();
  showToast('Response saved successfully!');
  renderOfficialDashboard();
}

// ===== POST ANNOUNCEMENT MODAL =====
function openPostAnnModal(){
  document.getElementById('modalContent').innerHTML=`
    <button class="close-btn" onclick="closeModal()">✕</button>
    <h3>Post Announcement</h3>
    <p style="font-size:12px;color:#888780;margin-top:3px">Share updates with all villagers.</p>
    <hr class="divider"/>
    <div class="form-group" style="margin-top:.5rem"><label>Title</label><input id="ann-title" placeholder="e.g. Free health camp on June 20" /></div>
    <div class="form-group"><label>Department</label>
      <select id="ann-dept"><option>Public Works</option><option>Health</option><option>Agriculture</option><option>Education</option><option>Water Supply</option><option>Electricity Board</option></select>
    </div>
    <div class="form-group"><label>Announcement Body</label><textarea id="ann-body" placeholder="Describe the announcement in detail..."></textarea></div>
    <button class="btn-full" onclick="postAnnouncement()">Publish Announcement</button>
  `;
  document.getElementById('modalBg').classList.add('open');
}

function postAnnouncement(){
  const title=document.getElementById('ann-title').value.trim();
  const dept=document.getElementById('ann-dept').value;
  const body=document.getElementById('ann-body').value.trim();
  if(!title||!body){showToast('Please fill in all fields.');return;}
  const newAnn={
    id:'A00'+(DB.announcements.length+1),
    title,dept,body,
    by:currentUser.fname+' '+currentUser.lname,
    date:new Date().toISOString().split('T')[0]
  };
  DB.announcements.unshift(newAnn);
  closeModal();
  showToast('Announcement published! 📢');
  renderOffAnnouncements();
  document.getElementById('ad-ann-num').textContent=DB.announcements.length;
}

// ===== SUBMIT COMPLAINT =====
function submitComplaint(){
  if(!currentUser){showPage('login');return;}
  const title=document.getElementById('comp-title').value.trim();
  const desc=document.getElementById('comp-desc').value.trim();
  const cat=document.getElementById('comp-cat').value;
  const priority=document.getElementById('comp-priority').value;
  const loc=document.getElementById('comp-loc').value.trim();
  const al=document.getElementById('comp-alert');
  if(!title||!desc){al.className='alert error';al.textContent='Please fill title and description.';return;}
  const newComp={
    id:'RV0'+(DB.complaints.length+1+1),
    userId:currentUser.id,
    name:currentUser.fname+' '+currentUser.lname,
    title,cat,priority,loc,desc,status:'Pending',
    date:new Date().toISOString().split('T')[0],response:''
  };
  DB.complaints.push(newComp);
  al.className='alert success'; al.textContent='Complaint submitted successfully!';
  setTimeout(()=>{showPage('villager');},1200);
  showToast('Complaint filed! ID: '+newComp.id);
}

// ===== ANNOUNCEMENTS =====
function renderAnnouncements(filter){
  const f=filter||annFilter;
  let list=DB.announcements;
  if(f!=='all') list=list.filter(a=>a.dept===f);
  const el=document.getElementById('ann-list');
  if(!list.length){el.innerHTML='<div class="empty-state"><div class="em-icon">📭</div><p>No announcements found.</p></div>';return;}
  el.innerHTML=list.map(a=>`
    <div class="ann-card">
      <div class="ann-top">
        <h3>${a.title}</h3>
        <span class="ann-dept">${a.dept}</span>
      </div>
      <p class="ann-body">${a.body}</p>
      <p class="ann-meta">Posted by ${a.by} &nbsp;·&nbsp; ${a.date}</p>
    </div>`).join('');
}
function setAnnFilter(f,el){
  annFilter=f;
  document.querySelectorAll('#ann-filter-row .filter-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  renderAnnouncements(f);
}

function loadAnnTab(){
  const el=document.getElementById('annTabContent');
  el.innerHTML=DB.announcements.map(a=>`
    <div class="ann-card">
      <div class="ann-top">
        <h3>${a.title}</h3>
        <span class="ann-dept">${a.dept}</span>
      </div>
      <p class="ann-body">${a.body}</p>
      <p class="ann-meta">Posted by ${a.by} &nbsp;·&nbsp; ${a.date}</p>
    </div>`).join('');
}

// ===== ADMIN DASHBOARD =====
function renderAdminDashboard(){
  document.getElementById('admin-user-tbody').innerHTML=DB.users.map(u=>`
    <tr>
      <td style="font-weight:600">${u.fname} ${u.lname}</td>
      <td style="color:#888780">${u.email}</td>
      <td><span class="badge ${u.role}">${u.role}</span></td>
      <td>${u.village||u.dept||'—'}</td>
      <td style="color:#888780">${u.joined}</td>
    </tr>`).join('');
  document.getElementById('admin-comp-tbody').innerHTML=DB.complaints.map(c=>`
    <tr>
      <td style="font-size:11px;color:#888780">${c.id}</td>
      <td>${c.name}</td>
      <td style="font-weight:600;color:#173404">${c.title}</td>
      <td>${c.cat}</td>
      <td><span class="badge ${c.status.toLowerCase().replace(' ','')}">${c.status}</span></td>
      <td style="color:#888780">${c.date}</td>
    </tr>`).join('');
  document.getElementById('admin-ann-tbody').innerHTML=DB.announcements.map(a=>`
    <tr>
      <td style="font-weight:600;color:#173404">${a.title}</td>
      <td><span class="badge villager">${a.dept}</span></td>
      <td>${a.by}</td>
      <td style="color:#888780">${a.date}</td>
    </tr>`).join('');
  document.getElementById('ad-comp-num').textContent=DB.complaints.length;
  document.getElementById('ad-ann-num').textContent=DB.announcements.length;
}

// ===== TABS =====
function switchTab(tabId, ctx){
  const tabs={
    vill:['my-complaints','announcements-tab','profile-tab'],
    off:['off-complaints','off-announcements'],
    adm:['admin-users','admin-complaints','admin-ann']
  };
  const list=tabs[ctx]||[];
  list.forEach(t=>{const el=document.getElementById(t);if(el)el.style.display='none';});
  const target=document.getElementById(tabId);
  if(target) target.style.display='block';
  const navScope=ctx==='vill'?'#page-villager':ctx==='off'?'#page-official':'#page-admin';
  document.querySelectorAll(navScope+' .tab-btn').forEach(b=>b.classList.remove('active'));
  if(typeof event!=='undefined' && event && event.target) event.target.classList.add('active');
}

// ===== MODAL =====
function closeModal(e){
  if(!e||e.target===document.getElementById('modalBg'))
    document.getElementById('modalBg').classList.remove('open');
}

// ===== TOAST =====
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ===== INIT =====
renderAnnouncements();
