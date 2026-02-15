import {
  ArrowRightIcon,
  BookOpenTextIcon,
  HeadsetIcon,
} from "@phosphor-icons/react";
import { BLOG_POSTS, HELP_LINKS } from "./Utils/constants";

function Home() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h4 className="text-neutral-dark mb-1">Bem-vindo!</h4>
        <p className="text-neutral-medium">
          Aqui está o que está acontecendo na plataforma hoje.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-neutral-dark">Últimos posts do blog</h5>
            <button
              type="button"
              className="text-primary font-medium text-sm flex items-center gap-1 hover:underline cursor-pointer"
            >
              Ver todos <ArrowRightIcon size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.title}
                className="bg-white rounded-xl border border-neutral-light/50 p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <h6 className="text-neutral-dark mb-1">{post.title}</h6>
                <p className="text-sm text-neutral-medium">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpenTextIcon size={24} className="text-neutral-dark" />
              <h5 className="text-neutral-dark">Central de ajuda</h5>
            </div>
            <p className="text-sm text-neutral-medium mb-4">
              Encontre rapidamente guias e documentações para dominar a nossa
              ferramenta.
            </p>

            <div className="flex flex-col gap-2">
              {HELP_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  className="flex items-center gap-3 bg-white border border-neutral-light/50 rounded-lg px-4 py-3 text-sm text-neutral-dark hover:border-primary/40 hover:bg-primary-light/30 transition-colors cursor-pointer text-left"
                >
                  <link.icon
                    size={18}
                    className="text-neutral-medium shrink-0"
                  />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-primary font-semibold mb-3">Precisa de ajuda?</p>
            <button
              type="button"
              className="bg-primary text-white rounded-full px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <HeadsetIcon size={18} />
              Falar com o suporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Home };
