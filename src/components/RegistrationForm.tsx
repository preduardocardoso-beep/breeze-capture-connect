import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  dataNascimento: z.string().min(8, "Data inválida"),
  email: z.string().email("E-mail inválido"),
  confirmarEmail: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  termos: z.boolean().refine((val) => val === true, "Você deve aceitar os termos"),
}).refine((data) => data.email === data.confirmarEmail, {
  message: "Os e-mails não coincidem",
  path: ["confirmarEmail"],
});

type FormData = z.infer<typeof formSchema>;

const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const formatDate = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\/\d{4})\d+?$/, "$1");
};

export function RegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCompleto: "",
      cpf: "",
      dataNascimento: "",
      email: "",
      confirmarEmail: "",
      whatsapp: "",
      termos: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    const message = encodeURIComponent(
      `*Novo Cadastro de Revendedor*\n\n` +
      `*Nome:* ${data.nomeCompleto}\n` +
      `*CPF:* ${data.cpf}\n` +
      `*Data de Nascimento:* ${data.dataNascimento}\n` +
      `*E-mail:* ${data.email}\n` +
      `*WhatsApp:* ${data.whatsapp}`
    );

    toast({
      title: "Cadastro enviado!",
      description: "Você será direcionado(a) a um promotor para conclusão do cadastro!",
    });

    setTimeout(() => {
      window.open(`https://wa.me/5511915367348?text=${message}`, "_blank");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nomeCompleto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome completo:<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome e sobrenome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                CPF:<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00"
                  {...field}
                  onChange={(e) => field.onChange(formatCPF(e.target.value))}
                  maxLength={14}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataNascimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Data de nascimento:<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="dd/mm/aaaa"
                  {...field}
                  onChange={(e) => field.onChange(formatDate(e.target.value))}
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                E-mail:<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmarEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirmar E-mail:<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                WhatsApp:<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="(00) 00000-0000"
                  {...field}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                  maxLength={15}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-xs text-muted-foreground">
          Os seus dados serão tratados de acordo com nossa{" "}
          <a href="#" className="text-primary underline">
            Política de Privacidade
          </a>
          .
        </p>

        <FormField
          control={form.control}
          name="termos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  Li e aceito os Termos de Uso e Condições Comerciais.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 text-lg font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Continuar cadastro"}
        </Button>
      </form>
    </Form>
  );
}
