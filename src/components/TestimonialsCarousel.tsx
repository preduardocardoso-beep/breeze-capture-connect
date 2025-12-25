import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { User } from "lucide-react";

const testimonials = [
  {
    name: "Rayssa Oliveira",
    location: "Revendedora O Boticário em São Carlos - SP",
    quote: "A pronta-entrega de produtos O Boticário e Eudora fez toda diferença aqui, inspirando força e variedade para atrair cada vez mais clientes.",
  },
  {
    name: "Bruno e Alex",
    location: "Revendedores O Boticário em Arapiraca - AL",
    quote: "Para mim, a venda direta é tudo. Ela é um caminho de perseverança, garra e vontade. A demanda é tão grande que preciso de um carro baú para carregar todas as mercadorias do Grupo Boticário.",
  },
  {
    name: "Mariana Nishi",
    location: "Revendedora O Boticário em São Bernardo do Campo - SP",
    quote: "Achava que não tinha habilidade para vendas, mas me descobri uma vendedora do Boticário.",
  },
  {
    name: "Mirian Camargo",
    location: "Revendedora O Boticário em Cotia - SP",
    quote: "Muito orgulho de ser revendedora do Grupo Boticário. Conquistei coisas que eu não imaginava, como conhecer Dubai, Paris e ganhar meu carro.",
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground text-center mb-2">O que dizem nossos</p>
        <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">
          Revendedores mais<br />que especiais:
        </h3>

        <div className="max-w-4xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-4">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar placeholder */}
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-muted flex items-center justify-center mb-4 overflow-hidden shadow-lg">
                        <User className="w-24 h-24 text-muted-foreground/50" />
                      </div>

                      <h4 className="text-lg font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {testimonial.location}
                      </p>
                      <p className="text-foreground italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
