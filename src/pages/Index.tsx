import { RegistrationForm } from "@/components/RegistrationForm";
import logoBoticario from "@/assets/logo-boticario.jpg";
import produtosGrupoBoticario from "@/assets/produtos-grupo-boticario.png";
import heroBanner from "@/assets/hero-banner-boticario.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoBoticario} 
              alt="O Boticário" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:block px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-colors">
              Entrar no portal
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Cadastrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative w-full">
        <img 
          src={heroBanner} 
          alt="Comece investindo apenas um cafezinho por dia e lucre até R$6.000 por mês - Seu futuro começa agora" 
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-5xl mx-auto">
            {/* Product Image */}
            <div className="flex justify-center md:justify-end order-first md:order-none mb-6 md:mb-0">
              <div className="relative w-full max-w-sm md:max-w-md">
                <img 
                  src={produtosGrupoBoticario} 
                  alt="Produtos Grupo Boticário - Malbec, Eudora, Quem Disse Berenice, O.U.i" 
                  className="w-full h-auto rounded-2xl shadow-xl object-cover"
                />
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                O Boticário, a marca de beleza
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                mais amada e preferida do Brasil.<sup>²</sup>
              </p>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Seja um Revendedor. É rápido e acessível!
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "💰", title: "Lucro alto", desc: "Ganhe até 30% de lucro em cada venda" },
              { icon: "📦", title: "Sem estoque", desc: "Comece sem precisar investir em produtos" },
              { icon: "🎁", title: "Brindes", desc: "Receba brindes e amostras exclusivas" },
              { icon: "📱", title: "Suporte", desc: "Tenha apoio completo para suas vendas" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 text-center shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-3 block">{benefit.icon}</span>
                <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-70">
            © 2024 Grupo Boticário. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2 opacity-50">
            ¹ Valores estimados. Resultados podem variar. ² Pesquisa Kantar 2023.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
