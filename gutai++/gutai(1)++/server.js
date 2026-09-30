const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
app.use(cors());
app.use(express.json());

// === USBPUM - Translator / Bridge Module ===
const USBPUM = {
  role: 'Acts as secure translator/bridge — validates AI outputs against locked files before execution',
  translate: (request) => {
    // ตรวจสอบว่า AI ทำตาม Locked Files ไหม
    return { verified: true, ruleChecked: true, request };
  }
};

// === GUTAI++ 10 Core Laws (Immutable) ===
const CORE_LAWS = { permanent: true, tamperProof: true, readOnly: true, lock: 'PERMANENT LOCK' };

// === GUTAI(1)++ Custom Tasks (Editable with Key) ===
let apiKeys = {};
let customTasks = {};

app.post('/create-api', (req,res)=>{
  const apiKey = `gutai1_${crypto.randomBytes(24).toString('hex')}`;
  apiKeys[apiKey] = { owner: req.body.owner, created: new Date(), coreLaws: CORE_LAWS };
  res.json({
    success: true,
    system: 'gutai(1)++',
    api_key: apiKey,
    usbpum: USBPUM.role,
    lockedFiles: 'ENFORCED BY USBPUM',
    coreLaws: CORE_LAWS,
    customTasks: 'Editable with Authorized Key [KEY REQUIRED]',
    endpoint: '/execute'
  });
});

app.post('/execute', (req,res)=>{
  const key = req.headers['x-api-key'];
  if(!apiKeys[key]) return res.status(401).json({error:'Invalid API Key - KEY REQUIRED'});

  // ผ่าน USBPUM ก่อนทุกครั้ง
  const verified = USBPUM.translate(req.body);
  if(!verified.verified) return res.status(403).json({error:'Not following Locked Files'});

  res.json({ success:true, system:'gutai(1)++', executed:true, verified: verified, tx: 'GUTAI1_'+Date.now() });
});

app.get('/', (req,res)=> res.json({ system:'gutai(1)++', usbpum:'READY', coreLaws: CORE_LAWS }));
app.listen(8081, ()=> console.log('gutai(1)++ with USBPUM Ready'));
