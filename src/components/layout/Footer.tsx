import { Film, Github, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-cinema-gold-500/10 mt-16 overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gold-gradient" style={{ backgroundSize: '200% auto' }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema-charcoal-950/50 to-cinema-charcoal-950 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-glow">
                <Film className="w-5 h-5 text-cinema-charcoal-950" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-display text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
                  CineScope
                </span>
                <p className="text-[10px] text-cinema-gold-600/70 tracking-[0.25em] -mt-1">CINEMA DISCOVERY</p>
              </div>
            </div>
            <p className="text-cinema-charcoal-300 leading-relaxed max-w-md mb-6">
              每个周末，我们都在寻找一部合适的电影。<br />
              让 <span className="text-cinema-gold-400">CineScope</span> 成为你的观影向导，<br />
              从心情出发，发现你真正想看的故事。
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Github, label: 'GitHub' },
                { Icon: Mail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-cinema-charcoal-800/60 border border-cinema-gold-500/15 flex items-center justify-center text-cinema-charcoal-400 hover:text-cinema-gold-400 hover:border-cinema-gold-500/40 hover:shadow-[0_0_20px_rgba(212,162,76,0.15)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-cinema-cream mb-5">快速导航</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: '首页', href: '/' },
                { label: '发现电影', href: '/discover' },
                { label: '排行榜', href: '/ranking' },
                { label: '我的片单', href: '/playlists' },
                { label: '观影足迹', href: '/profile' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cinema-charcoal-300 hover:text-cinema-gold-400 transition-colors hover:pl-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-cinema-cream mb-5">电影分类</h4>
            <div className="flex flex-wrap gap-2">
              {['剧情', '科幻', '喜剧', '爱情', '悬疑', '动画', '动作'].map((g) => (
                <span
                  key={g}
                  className="px-3 py-1.5 rounded-lg bg-cinema-charcoal-800/60 border border-cinema-gold-500/10 text-xs text-cinema-charcoal-300 hover:text-cinema-gold-400 hover:border-cinema-gold-500/30 cursor-pointer transition-all"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cinema-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cinema-charcoal-500">
            © {new Date().getFullYear()} CineScope. All movies & posters are for demo purposes.
          </p>
          <div className="flex items-center gap-6 text-xs text-cinema-charcoal-500">
            <a href="#" className="hover:text-cinema-gold-400 transition-colors">关于我们</a>
            <a href="#" className="hover:text-cinema-gold-400 transition-colors">用户协议</a>
            <a href="#" className="hover:text-cinema-gold-400 transition-colors">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
