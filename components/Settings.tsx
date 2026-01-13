
import React, { useState } from 'react';
import { Send, Smartphone, Bot, Cpu, Shield, Globe, Eye, EyeOff, CheckCircle, XCircle, RefreshCw, ExternalLink, Save, AlertCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'whatsapp' | 'telegram' | 'ai'>('telegram');
  const [showToken, setShowToken] = useState(false);
  const [tgToken, setTgToken] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [tgStatus, setTgStatus] = useState<'idle' | 'connected' | 'error'>('idle');
  
  // Webhook states
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleTestConnection = () => {
    if (!tgToken) return;
    setIsConnecting(true);
    setTgStatus('idle');
    // Simulate API call to get bot info
    setTimeout(() => {
      setIsConnecting(false);
      setTgStatus('connected');
    }, 1500);
  };

  const handleSaveConfig = () => {
    if (webhookEnabled && !webhookUrl.startsWith('https://')) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
    { id: 'telegram', label: 'Telegram', icon: Send },
    { id: 'ai', label: 'AI Providers', icon: Cpu },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings & Integrations</h1>
          <p className="text-slate-400 mt-1">Configure your bot platforms, API keys, and system rules.</p>
        </div>
        {saveStatus === 'success' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
            <CheckCircle size={16} />
            <span className="text-sm font-bold">Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden min-h-[500px] shadow-2xl">
        {activeTab === 'telegram' && (
          <div className="p-8 space-y-8 animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
                    <Send size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Telegram Bot Setup</h2>
                    <p className="text-sm text-slate-500">Connect your wholesale bot to Telegram via Bot API.</p>
                  </div>
                </div>

                <div className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                      Bot API Token
                      <a href="https://t.me/botfather" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 normal-case tracking-normal">
                        Get from @BotFather <ExternalLink size={10} />
                      </a>
                    </label>
                    <div className="relative">
                      <input 
                        type={showToken ? 'text' : 'password'}
                        value={tgToken}
                        onChange={(e) => setTgToken(e.target.value)}
                        placeholder="123456789:ABCDefGhIJKlmNoPQRstuVWXyz..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none pr-12 font-mono"
                      />
                      <button 
                        onClick={() => setShowToken(!showToken)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={handleTestConnection}
                      disabled={!tgToken || isConnecting}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-800 disabled:text-slate-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/10"
                    >
                      {isConnecting ? <RefreshCw size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                      {tgStatus === 'connected' ? 'Re-test Connection' : 'Connect & Test'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-80 space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Connection Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Network</span>
                      <div className="flex items-center gap-1.5 text-emerald-500 text-sm font-bold">
                        <CheckCircle size={14} /> Stable
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Webhook</span>
                      <div className={`flex items-center gap-1.5 text-sm font-bold ${webhookEnabled ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {webhookEnabled ? <CheckCircle size={14} /> : <XCircle size={14} />} 
                        {webhookEnabled ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                      <div className={`px-4 py-2 rounded-lg text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        tgStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        tgStatus === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                        'bg-slate-800 text-slate-500 border border-transparent'
                      }`}>
                        {tgStatus === 'connected' ? 'BOT ONLINE' : tgStatus === 'error' ? 'AUTH FAILED' : 'DISCONNECTED'}
                      </div>
                    </div>
                  </div>
                </div>

                {tgStatus === 'connected' && (
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 animate-in zoom-in-95 duration-300">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Bot Identity</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                        W
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">WholesaleBot_v2</p>
                        <p className="text-xs text-blue-400/70">@wholesale_agent_bot</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">Telegram Features Configuration</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className={`bg-slate-950 border p-6 rounded-2xl space-y-4 transition-all ${webhookEnabled ? 'border-emerald-500/30 ring-1 ring-emerald-500/10' : 'border-slate-800'}`}>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className={`p-2 rounded-lg transition-colors ${webhookEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                           <Globe size={18} />
                         </div>
                         <span className="text-sm font-bold text-white">Enable Webhooks</span>
                      </div>
                      <button 
                        onClick={() => setWebhookEnabled(!webhookEnabled)}
                        className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${webhookEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                      >
                         <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${webhookEnabled ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed">Instantly receive messages as they arrive. Requires a publicly accessible SSL-enabled endpoint.</p>
                   <div className="space-y-1">
                     <input 
                        type="text" 
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://api.yourdomain.com/telegram/webhook"
                        className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-xs text-slate-300 outline-none transition-all ${
                          webhookEnabled && !webhookUrl.startsWith('https://') && webhookUrl.length > 0 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-slate-800 focus:border-blue-500/50'
                        }`}
                     />
                     {webhookEnabled && !webhookUrl.startsWith('https://') && webhookUrl.length > 0 && (
                       <p className="text-[10px] text-red-400 flex items-center gap-1">
                         <AlertCircle size={10} /> Must start with https://
                       </p>
                     )}
                   </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="p-2 bg-slate-800 rounded-lg"><Shield size={18} className="text-slate-400" /></div>
                         <span className="text-sm font-bold text-white">Bot Privacy Mode</span>
                      </div>
                      <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                         <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed">If enabled, the bot can only see messages that mention its name or start with a command.</p>
                   <div className="flex gap-2">
                      <button className="flex-1 py-1.5 text-[10px] font-bold uppercase rounded bg-slate-800 text-slate-400 hover:bg-slate-700">Strict</button>
                      <button className="flex-1 py-1.5 text-[10px] font-bold uppercase rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Lenient</button>
                   </div>
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <button 
                  onClick={handleSaveConfig}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                  {isSaving ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="p-8 space-y-8 animate-in fade-in duration-300">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl">
                  <Cpu size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Provider Configuration</h2>
                  <p className="text-sm text-slate-500">Manage API keys and routing for Gemini, OpenAI, and Groq.</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Google Gemini', model: 'gemini-3-flash-preview', status: 'Connected' },
                  { name: 'OpenAI GPT-4', model: 'gpt-4-turbo', status: 'Idle' },
                  { name: 'Groq Llama 3', model: 'llama3-70b-8192', status: 'Idle' },
                ].map((provider, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:border-purple-500/30 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-400">
                          {provider.name[0]}
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{provider.name}</h4>
                           <p className="text-xs text-slate-500">Model: {provider.model}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                           provider.status === 'Connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                        }`}>
                           {provider.status}
                        </span>
                        <button className="text-xs text-purple-400 font-bold hover:underline">Configure</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="p-20 text-center space-y-4">
            <Globe size={48} className="mx-auto text-slate-700" />
            <h3 className="text-lg font-bold text-white">General Settings coming soon</h3>
            <p className="text-sm text-slate-500">Localization, timezones, and audit log rotation settings.</p>
          </div>
        )}
        
        {activeTab === 'whatsapp' && (
          <div className="p-20 text-center space-y-4">
            <Smartphone size={48} className="mx-auto text-slate-700" />
            <h3 className="text-lg font-bold text-white">WhatsApp Cloud API Configuration</h3>
            <p className="text-sm text-slate-500">Meta Phone Number ID and System User Access Tokens.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
